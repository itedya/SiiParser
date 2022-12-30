import IncludesEngine from "./engines/includes";
import ITokenType, {TokenIdentifier} from "./token-types/token-type";
import GameClass from "./game-classes/game-class";
import IValueTokenType from "./token-types/value/value-token-type";
import AttributeNameTokenType from "./token-types/attribute-name";
import ClassTypeTokenType from "./token-types/class-type";
import NamespaceTokenType from "./token-types/namespace";
import NewLineTokenType from "./token-types/new-line";
import UnitTokenTokenType from "./token-types/unit-token";
import FloatValueTokenType from "./token-types/value/float";
import IntValueTokenType from "./token-types/value/int";
import StringValueTokenType from "./token-types/value/string";
import TokenValueTokenType from "./token-types/value/token";
import Vector3IntValueTokenType from "./token-types/value/vector-3-int";
import Vector4TokenType from "./token-types/value/vector-4";
import RegexMatch from "./classes/regex-match";
import path from "path";
import CommentsEngine from "./engines/comments";
import {getSiiUnit} from "./decorators/sii-unit";
import ParseException from "./exceptions/parse-exception";
import AttributesEngine from "./engines/attributes";
import UnitTokensEngine from "./engines/unit-tokens";
import PropertyDoesNotExist from "./exceptions/property-does-not-exist";
import Vector2TokenType from "./token-types/value/vector-2";

type NotConstructedGameClass = new () => GameClass;

interface ParserOpts {
    gameClassTypes: Array<NotConstructedGameClass>
    tokenTypes?: Array<ITokenType>,
    valueTokenTypes?: Array<IValueTokenType<any>>
}

export class Parser {
    private readonly gameClassTypes: Array<NotConstructedGameClass>
    private readonly tokenTypes: Array<ITokenType>;
    private readonly valueTokenTypes: Array<IValueTokenType<any>>;

    constructor(opts: ParserOpts) {
        this.gameClassTypes = opts.gameClassTypes;

        if (opts.tokenTypes !== undefined) {
            this.tokenTypes = opts.tokenTypes;
        } else {
            const constructedGameClasses = opts.gameClassTypes.map(gameClass => new gameClass());

            this.tokenTypes = [];
            this.tokenTypes.push(new AttributeNameTokenType());
            this.tokenTypes.push(new ClassTypeTokenType(constructedGameClasses));
            this.tokenTypes.push(new NamespaceTokenType(constructedGameClasses));
            this.tokenTypes.push(new NewLineTokenType());
            this.tokenTypes.push(new UnitTokenTokenType());
        }

        if (opts.valueTokenTypes !== undefined) {
            this.valueTokenTypes = opts.valueTokenTypes;
        } else {
            this.valueTokenTypes = [];
            this.valueTokenTypes.push(new FloatValueTokenType());
            this.valueTokenTypes.push(new IntValueTokenType());
            this.valueTokenTypes.push(new StringValueTokenType());
            this.valueTokenTypes.push(new TokenValueTokenType());
            this.valueTokenTypes.push(new Vector3IntValueTokenType());
            this.valueTokenTypes.push(new Vector4TokenType());
            this.valueTokenTypes.push(new Vector2TokenType());
        }
    }

    getGameClassFromIdentifier(identifier: string): NotConstructedGameClass | undefined {
        return this.gameClassTypes.find(gameClass => {
            return getSiiUnit(new gameClass()) === identifier;
        });
    }

    parse(includesEngine: IncludesEngine, content: string, filePath: string) {
        const commentsEngine = new CommentsEngine();
        content = commentsEngine.removeComments(content);
        content = includesEngine.process(content, path.dirname(filePath));
        content = commentsEngine.removeComments(content);

        // Match values with regex
        const regexMatches: RegexMatch[] = this.tokenTypes.concat(this.valueTokenTypes).map(tokenType => {
            const matches = [];

            let result;
            while ((result = tokenType.regex.exec(content)) !== null) {
                matches.push(new RegexMatch(result[0], result.index, tokenType.identifier));
            }

            return matches;
        }).flat(1).sort((a, b) => a.index - b.index);

        if (regexMatches.length === 0) {
            throw new ParseException("No matches found, file is probably empty.");
        }

        const attributesEngine = new AttributesEngine(regexMatches, this.valueTokenTypes);
        const unitTokensEngine = new UnitTokensEngine();

        const items: GameClass[] = [];

        for (let i = 0; i < regexMatches.length; i++) {
            console.log(`Processing match ${i + 1} of ${regexMatches.length}`);
            const regexMatch = regexMatches[i];
            const firstItem = (items.length === 0) ? null : items[items.length - 1];

            // Process New Line
            if (regexMatch.tokenType === TokenIdentifier.NewLine) continue;

            // Process Unit Token and Unit Initialization Token
            if (regexMatch.tokenType === TokenIdentifier.UnitToken) {
                unitTokensEngine.unitTokenUsage(regexMatch.value);
                continue;
            }

            // Assign Game class
            if (regexMatch.tokenType === TokenIdentifier.ClassType) {
                if (!unitTokensEngine.canCreateClass()) {
                    throw new ParseException("Can't create class, invalid usage of unit tokens! Invalid file contents.");
                }

                // Check if next match is namespace token (if it is, file contents are correct)
                if (regexMatches[i + 1].tokenType !== TokenIdentifier.Namespace) {
                    throw new ParseException("After class type definition, there should be a namespace!");
                }

                // Get Game Class type from string identifier (for ex. accessory_truck_data = AccessoryTruckData class)
                const type = this.getGameClassFromIdentifier(regexMatch.value);
                if (type === undefined) {
                    throw new ParseException("Program couldn't find game class matching sii unit named " + regexMatch.value);
                }

                // Create instance of game class and add it to parsed items
                items.push(new type());
                continue;
            } else if (regexMatch.tokenType == TokenIdentifier.Namespace) {
                if (!unitTokensEngine.canAssignNamespace()) {
                    throw new ParseException("Can't assign namespace, invalid usage of unit tokens! Invalid file contents.");
                }

                if (firstItem === null) {
                    throw new ParseException("Can't assign namespace if game class is undefined!");
                }

                firstItem.namespace = regexMatch.value;
            } else if (regexMatch.tokenType === TokenIdentifier.AttributeName) {
                if (!unitTokensEngine.canAssignAttribute()) {
                    throw new ParseException("Can't assign attributes, invalid usage of unit tokens! Invalid file contents.");
                }

                if (firstItem === null) {
                    throw new ParseException("Can't assign attribute if game class is undefined!");
                }

                attributesEngine.canAssignAttribute(regexMatches[i + 1], regexMatches[i + 2]);

                try {
                    attributesEngine.assignAttribute(firstItem, regexMatch, regexMatches[i + 1]);
                } catch (e) {
                    if (e instanceof ParseException || e instanceof PropertyDoesNotExist) {
                        console.error(e.message);
                        console.log("Error is not critical, continuing...");
                    } else {
                        throw e;
                    }
                }

                i += 2;
            } else if (this.valueTokenTypes.find(valueTokenType => regexMatch.tokenType === valueTokenType.identifier) !== null) {
                throw new ParseException("Parser didn't see any attribute name to value: " + regexMatch.value);
            }

            if (firstItem !== null) {
                items[items.length - 1] = firstItem;

            }
        }

        return items;
    }
}