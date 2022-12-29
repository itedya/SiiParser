import IValueTokenType from "./value-token-type";
import Vector4 from "../../classes/vector-4";
import {TokenIdentifier} from "../token-type";

class Vector4TokenType implements IValueTokenType<Vector4> {
    public readonly regex = new RegExp("(?<=(: |:))\\(-?\\d+\\.\\d+, -?\\d+\\.\\d+, -?\\d+\\.\\d+, -?\\d+\\.\\d+\\)(?=[\\s\\n])");
    public readonly identifier = TokenIdentifier.Vector4;

    parse(rawValue: string): Vector4 {
        rawValue = rawValue.substring(1, rawValue.length);
        rawValue = rawValue.substring(0, rawValue.length - 1);
        rawValue = rawValue.replaceAll(" ", "");

        const splittedString: string[] = rawValue.split(",");

        return new Vector4(
            parseFloat(splittedString[0]),
            parseFloat(splittedString[1]),
            parseFloat(splittedString[2]),
            parseFloat(splittedString[3])
        );
    }
}

export default Vector4TokenType;