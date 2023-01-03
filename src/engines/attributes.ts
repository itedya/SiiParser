import ParseException from "../exceptions/parse.exception";
import IEngine, {ContextData} from "./engine";
import GameClass from "../game-classes/game-class";
import PropertyDoesNotExistException from "../exceptions/property-does-not-exist.exception";
import IValueTokenType from "../token-types/value/value-token-type";
import {debug} from "util";

class AttributesEngine implements IEngine {
    private valueTokenTypes: IValueTokenType<any>[];

    constructor(valueTokenTypes: IValueTokenType<any>[]) {
        this.valueTokenTypes = valueTokenTypes;
    }

    private arrayIndexRegex = new RegExp("(?<=\\[)\\d+(?=\])", 'g');

    private removeArrayIndex(attributeName: string): string {
        return attributeName.replaceAll(this.arrayIndexRegex, "");
    }

    private isArrayLengthIdentifier(gameClass: GameClass, attribName: string) {
        try {
            gameClass.getByAttributeName(`${attribName}[]`)
            return true;
        } catch (e) {
            if (e instanceof PropertyDoesNotExistException) {
                return false;
            }

            throw e;
        }
    }

    private firstOrPush(items: any[], item: any) {
        if (items.length === 0) items.push(item);
        items[items.length - 1] = item;
        return items;
    }

    async process(contextData: ContextData): Promise<ContextData> {
        let {unitTokensEngine, extractedItems, lineParts} = contextData;

        const gameClass = extractedItems[extractedItems.length - 1];

        if (!unitTokensEngine.canAssignAttribute()) {
            throw new ParseException("Can't assign attributes, invalid usage of unit tokens! Invalid file contents.");
        }

        if (gameClass === undefined) {
            throw new ParseException("Can't assign attribute if game class is undefined!");
        }

        const attributeName = this.removeArrayIndex(lineParts[0]);
        if (this.isArrayLengthIdentifier(gameClass, attributeName)) {
            return contextData;
        }

        const isArrayItem = attributeName.includes("[]");

        const tokenType = this.valueTokenTypes.find(valueTokenType => valueTokenType.regex.test(lineParts[1]))

        const value = tokenType!.parse(lineParts[1]);

        if (isArrayItem) {
            let attributeValue: any[] = gameClass.getByAttributeName(attributeName.substring(0));

            if (attributeValue === undefined) {
                gameClass.setByAttributeName(attributeName, []);
                attributeValue = [];
            }

            attributeValue.push(value);

            gameClass.setByAttributeName(attributeName, attributeValue);
        } else {
            gameClass.setByAttributeName(attributeName, value);
        }

        extractedItems = this.firstOrPush(extractedItems, gameClass);

        return {lineParts, extractedItems, unitTokensEngine};
    }
}

export default AttributesEngine;