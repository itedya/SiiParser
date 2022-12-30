import HandableException from "./handable-exception";

class ParseException extends HandableException {
    constructor(message: string) {
        super(`Parse exception: ${message}`);
    }

    handle(): void {
        console.error(this.message);
        process.exit(1);
    }

}
export default ParseException;