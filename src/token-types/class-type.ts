import GameClass from "../game-classes/game-class";
import ITokenType, {TokenIdentifier} from "./token-type";

class ClassTypeTokenType implements ITokenType {
    public readonly identifier = TokenIdentifier.ClassType;
    public readonly regex: RegExp;

    constructor(gameClasses: GameClass[]) {
        const identifiers = gameClasses.map(gameClass => {
            return gameClass.namespace;
        });

        this.regex = new RegExp("(" + identifiers.join("|") + ")");
    }
}

export default ClassTypeTokenType;