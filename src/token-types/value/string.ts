import IValueTokenType from "./value-token-type";
import {TokenIdentifier} from "../token-type";

export class IntValueTokenType implements IValueTokenType<string> {
    public readonly regex = new RegExp("\"(?:\\\\[\"\\\\n]|[^\\n\"\\\\])*\"");
    public readonly identifier = TokenIdentifier.String;

    parse(rawValue: string): string {
        return rawValue.substring(1, rawValue.length - 1)
    }
}

export default IntValueTokenType;