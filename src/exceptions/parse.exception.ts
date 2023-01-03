import Exception from "./exception";

class ParseException extends Exception {
    constructor(message: string) {
        super(`Parse exception: ${message}`);
    }
}

export default ParseException;