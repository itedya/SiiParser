import IValueTokenType from "./value-token-type";
import Vector4 from "../../classes/vector-4";
import {TokenIdentifier} from "../token-type";
import Vector2 from "../../classes/vector-2";

class Vector2TokenType implements IValueTokenType<Vector2> {
    public readonly regex = new RegExp("(?<=(: |:))\\(-?\\d+(\\.\\d+)?, -?\\d+(\\.\\d+)?\\)(?=[\\s\\n])", 'g');
    public readonly identifier = TokenIdentifier.Vector2;

    parse(rawValue: string): Vector2 {
        rawValue = rawValue.substring(1, rawValue.length);
        rawValue = rawValue.substring(0, rawValue.length - 1);
        rawValue = rawValue.replaceAll(" ", "");

        const splittedString: string[] = rawValue.split(",");

        return new Vector2(
            parseFloat(splittedString[0]),
            parseFloat(splittedString[1])
        );
    }
}

export default Vector2TokenType;