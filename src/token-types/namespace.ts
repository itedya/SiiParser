import GameClass from "../game-classes/game-class";
import {getSiiUnit} from "../decorators/sii-unit";
import ITokenType, {TokenIdentifier} from "./token-type";


class NamespaceTokenType implements ITokenType {
    public readonly regex: RegExp;
    public readonly identifier = TokenIdentifier.Namespace;

    constructor(gameClasses: GameClass[]) {
        const classIdentifiers = gameClasses.map(gameClass => getSiiUnit(gameClass));
        this.regex = new RegExp("(?<=(" + classIdentifiers.join("|") + ") : )[a-zA-Z0-9_.]+(?=\n)");
    }
}

export default NamespaceTokenType;