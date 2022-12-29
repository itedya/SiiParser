import GameClass from "../game-classes/game-class";

export default function SiiAttribute(target: GameClass, propertyName: string) {
    return (unitName: string) => {
        return Reflect.defineMetadata("sii-attribute", unitName, target, propertyName);
    }
}

export function GetSiiAttribute(target: GameClass, propertyName: string) {
    return Reflect.getMetadata("sii-attribute", target, propertyName);
}