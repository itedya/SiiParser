import GameClass from "../game-classes/game-class";

export default function SiiUnit(target: GameClass) {
    return (unitName: string) => {
        return Reflect.defineMetadata("sii-unit", unitName, target);
    }
}

export function getSiiUnit(target: GameClass) {
    return Reflect.getMetadata("sii-unit", target);
}