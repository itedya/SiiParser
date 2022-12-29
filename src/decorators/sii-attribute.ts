import GameClass from "../game-classes/game-class";

export default function SiiAttribute(unitPropertyName: string) {
    return (target: GameClass, propertyKey: string) => {
        return Reflect.defineMetadata("sii-attribute", unitPropertyName, target, propertyKey);
    }
}

export function getSiiAttribute(target: GameClass, propertyName: string) {
    return Reflect.getMetadata("sii-attribute", target, propertyName);
}