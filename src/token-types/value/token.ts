import IValueTokenType from "./value-token-type";

export class TokenValueTokenType implements IValueTokenType<string> {
    public readonly regex = new RegExp("(?<=(\\n(\\t|\\s+))(\\w+(\\[(\\d+)?\\])?)(:|: ))[a-z_]+(?=[\\s\\n])");
    public readonly identifier = TokenIdentifier.Token;

    parse(rawValue: string): string {
        return rawValue;
    }
}

export default TokenValueTokenType;