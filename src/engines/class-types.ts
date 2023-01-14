import {ContextData} from "./engine";
import GameClass from "../game-classes/game-class";
import NotConstructed from "../types/not-constructed.type";
import ParseException from "../exceptions/parse.exception";
import {getSiiUnit} from "../decorators/sii-unit";
import NoGameClassFoundException from "../exceptions/no-game-class-found.exception";

class ClassTypesEngine {
    private readonly gameClassTypes: Array<NotConstructed<GameClass>>;

    constructor(gameClassTypes: Array<NotConstructed<GameClass>>) {
        this.gameClassTypes = gameClassTypes;
    }

    public async process(contextData: ContextData): Promise<ContextData> {
        const {lineParts, extractedItems, unitTokensEngine} = contextData;

        if (!unitTokensEngine.canCreateClass()) {
            throw new ParseException("Can't create class, invalid usage of unit tokens! Invalid file contents.");
        }

        const type = this.getGameClassFromIdentifier(lineParts[0]);
        if (type === undefined) {
            throw new NoGameClassFoundException(lineParts[0]);
        }

        extractedItems.push(new type());

        return {
            lineParts,
            extractedItems,
            unitTokensEngine
        };
    }

    private getGameClassFromIdentifier(identifier: string): NotConstructed<GameClass> | undefined {
        return this.gameClassTypes.find(gameClass => {
            return getSiiUnit(new gameClass()) === identifier;
        });
    }
}

export default ClassTypesEngine;