import GameClass from "../game-classes/game-class";
import ITokenType, {TokenIdentifier} from "./token-type";
import {getSiiUnit} from "../decorators/sii-unit";

class ClassTypeTokenType implements ITokenType {
    public readonly identifier = TokenIdentifier.ClassType;
    public readonly regex: RegExp;

    constructor(gameClasses: GameClass[]) {
        const identifiers = gameClasses.map(gameClass => {
            return getSiiUnit(gameClass);
        });

        this.regex = new RegExp("(" + identifiers.join("|") + ")", 'g');
    }
}

export default ClassTypeTokenType;