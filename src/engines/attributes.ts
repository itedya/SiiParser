import RegexMatch from "../classes/regex-match";
import IValueTokenType from "../token-types/value/value-token-type";
import ParseException from "../exceptions/parse-exception";
import {TokenIdentifier} from "../token-types/token-type";
import AttributeNameTokenType from "../token-types/attribute-name";
import GameClass from "../game-classes/game-class";

enum AttributeAssignResult {
    AbortedAttributeIsArrayLengthIdentifier,
    Success
}

class AttributesEngine {
    private matches: RegexMatch[];
    private valueTokenTypes: IValueTokenType<any>[];

    constructor(matches: RegexMatch[], valueTokenTypes: IValueTokenType<any>[]) {
        this.matches = matches;
        this.valueTokenTypes = valueTokenTypes;
    }

    canAssignAttribute(
        secondRegexMatch: RegexMatch,
        thirdRegexMatch: RegexMatch
    ) {
        if (this.valueTokenTypes.find(tokenType => secondRegexMatch.tokenType === tokenType.identifier) === undefined) {
            throw new ParseException("After attribute name, there should be a value!");
        }

        if (thirdRegexMatch.tokenType != TokenIdentifier.NewLine) {
            throw new ParseException("After attribute value, there should be a new line!");
        }
    }

    isAttributeArrayLengthIdentifier(attributeName: string) {
        const attributeNameWithArrayIdentifier = attributeName + "[]";
        const matches = this.matches.filter(match => {
            if (match.tokenType != TokenIdentifier.AttributeName) return false;

            const withRemovedArrayIndex = AttributeNameTokenType.removeArrayIndex(attributeName);
            return match.tokenType === TokenIdentifier.AttributeName &&
                withRemovedArrayIndex === attributeNameWithArrayIdentifier;
        });

        return matches.length >= 1;
    }

    assignAttribute(
        gameClass: GameClass,
        attributeNameMatch: RegexMatch,
        valueMatch: RegexMatch
    ): AttributeAssignResult {
        const attributeName = AttributeNameTokenType.removeArrayIndex(attributeNameMatch.value);
        if (this.isAttributeArrayLengthIdentifier(attributeName)) {
            return AttributeAssignResult.AbortedAttributeIsArrayLengthIdentifier;
        }

        const isArrayItem = attributeName.includes("[]");

        const valueTokenType = this.valueTokenTypes.find(valueTokenType => valueMatch.tokenType === valueTokenType.identifier);
        if (valueTokenType === undefined) {
            throw new ParseException(`Program wasn't able to find value token type to ${valueMatch.value} match`);
        }

        const value = valueTokenType.parse(valueMatch.value);
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

        return AttributeAssignResult.Success
    }
}

export default AttributesEngine;