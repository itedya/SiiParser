import PropertyDoesNotExist from "../exceptions/property-does-not-exist";
import {getSiiAttribute} from "../decorators/sii-attribute";

interface IIndexable {
    [key: string]: any
}

abstract class GameClass {
    public abstract namespace: string;

    public getByAttributeName(attributeName: string): any {
        const propertyName = Object.keys(this).find(property => getSiiAttribute(this, property) === attributeName);
        if (propertyName === undefined) {
            throw new PropertyDoesNotExist(attributeName);
        } else {
            return (this as IIndexable)[propertyName];
        }
    }

    public setByAttributeName(attributeName: string, value: any) {
        const propertyName = Object.keys(this).find(property => getSiiAttribute(this, property) === attributeName);
        if (propertyName === undefined) {
            throw new PropertyDoesNotExist(attributeName);
        } else {
            Object.assign(this, {[propertyName]: value});
        }
    }
}

export default GameClass;