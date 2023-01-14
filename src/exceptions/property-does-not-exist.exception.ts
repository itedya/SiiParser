import Exception from "./exception";

class PropertyDoesNotExistException extends Exception {
    constructor(propName: string) {
        super(`Property ${propName} does not exist!`);
    }
}

export default PropertyDoesNotExistException;