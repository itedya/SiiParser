import ITokenType, {TokenIdentifier} from "./token-type";

class AttributeNameTokenType implements ITokenType {
    public readonly regex: RegExp;
    public readonly identifier: string = TokenIdentifier.AttributeName;

    constructor() {
        this.regex = new RegExp("(?<=\\n(\\t|\\s+))\\w+(\\[(\\d+)?\])?(?=:)");
    }

    private static arrayIndexRegex = new RegExp("(?<=\\[)\\d+(?=\])");

    public static removeArrayIndex(attributeName: string) {
        return attributeName.replaceAll(this.arrayIndexRegex, "");
    }
}

export default AttributeNameTokenType;