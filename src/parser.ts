import {dirname} from "path";
import {readFile} from "fs/promises";
import ITokenType from "./token-types/token-type";
import IValueTokenType from "./token-types/value/value-token-type";
import FloatValueTokenType from "./token-types/value/float";
import IntValueTokenType from "./token-types/value/int";
import StringValueTokenType from "./token-types/value/string";
import TokenValueTokenType from "./token-types/value/token";
import IncludesEngine from "./engines/includes";
import CommentsEngine from "./engines/comments";
import AttributesEngine from "./engines/attributes";
import UnitTokensEngine from "./engines/unit-tokens";
import ClassTypesEngine from "./engines/class-types";
import ParseException from "./exceptions/parse.exception";
import GameClass from "./game-classes/game-class";
import WhitespacesEngine from "./engines/whitespaces";
import Vector2ValueTokenType from "./token-types/value/vector-2";
import Vector3ValueTokenType from "./token-types/value/vector-3";
import Vector4ValueTokenType from "./token-types/value/vector-4";
import PropertyDoesNotExistException from "./exceptions/property-does-not-exist.exception";
import NoGameClassFoundException from "./exceptions/no-game-class-found.exception";
import NamespacesEngine from "./engines/namespaces";

type NotConstructedGameClass = new () => GameClass;

interface ThrowExceptionsOpts {
    propertyDoesNotExist: boolean,
    noGameClassFound: boolean
}

interface ParserOpts {
    gameClassTypes: Array<NotConstructedGameClass>
    tokenTypes?: Array<ITokenType>,
    valueTokenTypes?: Array<IValueTokenType<any>>,
    throwExceptions: ThrowExceptionsOpts
}

export class Parser {
    private readonly throwExceptions: ThrowExceptionsOpts;
    private readonly gameClassTypes: Array<NotConstructedGameClass>;
    private readonly valueTokenTypes: IValueTokenType<any>[];

    constructor(opts: ParserOpts) {
        this.gameClassTypes = opts.gameClassTypes
        this.throwExceptions = opts.throwExceptions;
        if (opts.valueTokenTypes === undefined) {
            this.valueTokenTypes = [];
            this.valueTokenTypes.push(new FloatValueTokenType());
            this.valueTokenTypes.push(new IntValueTokenType());
            this.valueTokenTypes.push(new StringValueTokenType());
            this.valueTokenTypes.push(new TokenValueTokenType());
            this.valueTokenTypes.push(new Vector2ValueTokenType());
            this.valueTokenTypes.push(new Vector3ValueTokenType());
            this.valueTokenTypes.push(new Vector4ValueTokenType());
        } else {
            this.valueTokenTypes = opts.valueTokenTypes;
        }
    }


    private async prepareFileContents(filePath: string, rootDirectory: string): Promise<string> {
        const commentsEngine = new CommentsEngine();
        const includesEngine = new IncludesEngine(rootDirectory);
        const whitespacesEngine = new WhitespacesEngine();


        return readFile(filePath, {encoding: "utf-8"})
            .then(async file => commentsEngine.removeComments(file))
            .then(async file => includesEngine.process(file, dirname(filePath)))
            .then(async file => commentsEngine.removeComments(file))
            .then(async file => whitespacesEngine.process(file));
    }

    private joinLineParts(lineParts: string[]): string[] {
        if (lineParts.length === 2) {
            return lineParts;
        } else if (lineParts.length >= 3) {
            return [
                lineParts[0],
                lineParts.slice(1, lineParts.length).join(":")
            ];
        } else {
            throw new ParseException(`Can't join line ${lineParts}`);
        }
    }

    async parse(filePath: string, rootDirectory: string) {
        const content = await this.prepareFileContents(filePath, rootDirectory);

        let unitTokensEngine = new UnitTokensEngine();
        const attributesEngine = new AttributesEngine(this.valueTokenTypes);
        const classTypesEngine = new ClassTypesEngine(this.gameClassTypes);
        const namespacesEngine = new NamespacesEngine();

        const lines = content.split("\n");

        let extractedItems: GameClass[] = [];
        try {
            for (const line of lines) {
                try {
                    let lineParts = line.split(":");

                    if (unitTokensEngine.isUnitToken(lineParts[0])) {
                        unitTokensEngine.unitTokenUsage(lineParts[0]);
                        continue;
                    }

                    if (lineParts.length >= 2) {
                        lineParts = this.joinLineParts(lineParts);
                        let contextData = {lineParts, extractedItems, unitTokensEngine};

                        if (unitTokensEngine.canCreateClass() && unitTokensEngine.canAssignNamespace()) {
                            contextData = await classTypesEngine.process(contextData);
                            contextData = await namespacesEngine.process(contextData);
                        } else if (unitTokensEngine.canAssignAttribute()) {
                            contextData = await attributesEngine.process(contextData);
                        } else {
                            throw new ParseException(`Line ${line} is invalid`);
                        }

                        extractedItems = contextData.extractedItems;
                    }
                } catch (e) {
                    if (e instanceof PropertyDoesNotExistException) {
                        if (this.throwExceptions.propertyDoesNotExist) {
                            console.error(e.message);
                            process.exit(1);
                        }

                        continue;
                    }

                    throw e;
                }
            }
        } catch (e) {
            if (e instanceof NoGameClassFoundException && this.throwExceptions.noGameClassFound) {
                console.error(e.message);
            }
        }

        return extractedItems;
    }

}