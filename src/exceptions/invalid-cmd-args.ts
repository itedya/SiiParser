import HandableException from "./handable-exception";

class InvalidCmdArgsException extends HandableException {
    public constructor(message: string) {
        super(`Invalid command line args: ${message}`);
    }

    public handle() {
        console.log(this.message);
        process.exit(1);
    }
}

export default InvalidCmdArgsException;