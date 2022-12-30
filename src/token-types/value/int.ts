import IValueTokenType from "./value-token-type";
import {TokenIdentifier} from "../token-type";

export class IntValueTokenType implements IValueTokenType<number> {
    public readonly regex = new RegExp("(?<=(: |:))-?\\d+(?=[\\s\\n])", 'g');
    public readonly identifier = TokenIdentifier.Int;

    parse(rawValue: string): number {
        return parseInt(rawValue);
    }
}

export default IntValueTokenType;