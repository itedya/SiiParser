import GameClass from "../game-classes/game-class";
import ITokenType, {TokenIdentifier} from "./token-type";
import {getSiiUnit} from "../decorators/sii-unit";

class ClassTypeTokenType implements ITokenType {
    public readonly identifier = TokenIdentifier.ClassType;
    public readonly regex: RegExp;

    constructor() {
        this.regex = new RegExp("(?<=\\{\\n)[a-z_]+(?=(:[a-zA-Z0-9_.]+\\n\\{))", 'gm');
    }
}

export default ClassTypeTokenType;