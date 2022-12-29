import IValueTokenType from "./value-token-type";

export class IntValueTokenType implements IValueTokenType<number> {
    public readonly regex = new RegExp("(?<=(: |:))-?\d+(?=[\s\n])");
    public readonly identifier = TokenIdentifier.Int;

    parse(rawValue: string): number {
        return parseInt(rawValue);
    }
}

export default IntValueTokenType;