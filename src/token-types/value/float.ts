import IValueTokenType from "./value-token-type";

export class FloatValueTokenType implements IValueTokenType<number> {
    public readonly regex = new RegExp("(?<=(: |:))-?\\d+\\.\\d+(?=[\\s\\n])");
    public readonly identifier = TokenIdentifier.Float;

    parse(rawValue: string): number {
        return parseFloat(rawValue);
    }
}

export default FloatValueTokenType;