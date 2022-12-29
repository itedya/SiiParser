import IValueTokenType from "./value-token-type";
import Vector3Int from "../../classes/vector-3-int";
import {TokenIdentifier} from "../token-type";

export class Vector3IntValueTokenType implements IValueTokenType<Vector3Int> {
    public readonly regex = new RegExp("(?<=[ :])\\(-?\\d+, -?\\d+, -?\\d+\\)(?=[\\s\\n])");
    public readonly identifier = TokenIdentifier.Vector3Int;

    parse(rawValue: string): Vector3Int {
        rawValue = rawValue.substring(1, rawValue.length);
        rawValue = rawValue.substring(0, rawValue.length - 1);
        rawValue = rawValue.replaceAll(" ", "");

        const splittedString: string[] = rawValue.split(",");

        return new Vector3Int(
            parseInt(splittedString[0]),
            parseInt(splittedString[1]),
            parseInt(splittedString[2])
        );
    }
}

export default Vector3IntValueTokenType;