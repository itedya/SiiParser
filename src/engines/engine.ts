import UnitTokensEngine from "./unit-tokens";
import GameClass from "../game-classes/game-class";

interface ContextData {
    lineParts: string[];
    unitTokensEngine: UnitTokensEngine
    extractedItems: GameClass[]
}

interface IEngine {
    process: (contextData: ContextData) => Promise<ContextData>
}

export {
    IEngine as default,
    ContextData
};