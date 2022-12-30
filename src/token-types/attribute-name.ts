import ITokenType, {TokenIdentifier} from "./token-type";

class AttributeNameTokenType implements ITokenType {
    public readonly regex: RegExp;
    public readonly identifier = TokenIdentifier.AttributeName;

    constructor() {
        this.regex = new RegExp("(?<=\\n(\\t|\\s+))\\w+(\\[(\\d+)?\])?(?=:)", 'g');
    }

    private static arrayIndexRegex = new RegExp("(?<=\\[)\\d+(?=\])", 'g');

    public static removeArrayIndex(attributeName: string): string {
        return attributeName.replaceAll(this.arrayIndexRegex, "");
    }
}

export default AttributeNameTokenType;