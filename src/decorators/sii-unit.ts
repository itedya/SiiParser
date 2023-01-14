import GameClass from "../game-classes/game-class";

export default function SiiUnit(unitName: string) {
    return (constructor: Function) => {
        return Reflect.defineMetadata("sii-unit", unitName, constructor.prototype);
    }
}

export function getSiiUnit(target: GameClass) {
    return Reflect.getMetadata("sii-unit", target);
}