import Exception from "./exception";

class NoGameClassFoundException extends Exception {
    constructor(classIdentifier: string) {
        super(`No matching game class found - "${classIdentifier}". You have to add it manually and recompile the program or run it again with -g parameter to skip not recognized classes.`);
    }
}

export default NoGameClassFoundException;