import PropertyDoesNotExist from "../exceptions/property-does-not-exist";

abstract class GameClass {
    public abstract namespace: string;

    public assignProperty(propertyName: string, value: string) {
        if (!(propertyName in this)) {
            throw new PropertyDoesNotExist(propertyName);
        } else {
            Object.assign(this, {[propertyName]: value});
        }
    }
}

export default GameClass;