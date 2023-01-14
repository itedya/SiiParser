import Exception from "./exception";

class InvalidCmdArgsException extends Exception {
    public constructor(message: string) {
        super(`Invalid command line args: ${message}`);
    }
}

export default InvalidCmdArgsException;