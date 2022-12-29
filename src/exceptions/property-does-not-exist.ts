class PropertyDoesNotExist extends Error {
    constructor(propName: string) {
        super(`Property ${propName} does not exist!`);
    }
}

export default PropertyDoesNotExist;