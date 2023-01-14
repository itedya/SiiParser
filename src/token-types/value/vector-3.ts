import IValueTokenType from "./value-token-type";
import {TokenIdentifier} from "../token-type";
import Vector3Float from "../../classes/vector-3-float";

export class Vector3ValueTokenType implements IValueTokenType<Vector3Float> {
    public readonly regex = new RegExp("^\\(-?\\d+(\\.\\d+)?,-?\\d+(\\.\\d+)?,-?\\d+(\\.\\d+)?\\)$");
    public readonly identifier = TokenIdentifier.Vector3;

    parse(rawValue: string): Vector3Float {
        rawValue = rawValue.substring(1, rawValue.length);
        rawValue = rawValue.substring(0, rawValue.length - 1);
        rawValue = rawValue.replaceAll(" ", "");

        const splittedString: string[] = rawValue.split(",");

        return new Vector3Float(
            parseFloat(splittedString[0]),
            parseFloat(splittedString[1]),
            parseFloat(splittedString[2])
        );
    }
}

export default Vector3ValueTokenType;