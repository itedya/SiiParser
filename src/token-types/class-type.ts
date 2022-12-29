import GameClass from "../game-classes/game-class";

class ClassTypeTokenType implements ITokenType {
    public readonly identifier: string = TokenIdentifier.ClassType;
    public readonly regex: RegExp;

    constructor(gameClasses: GameClass[]) {
        const identifiers = gameClasses.map(gameClass => {
            return gameClass.namespace;
        });

        this.regex = new RegExp("(" + identifiers.join("|") + ")");
    }
}

export default ClassTypeTokenType;