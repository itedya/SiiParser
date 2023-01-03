import Exception from "./exception";

class NoGameClassFoundException extends Exception {
    constructor() {
        super("No matching game class found");
    }
}

export default NoGameClassFoundException;