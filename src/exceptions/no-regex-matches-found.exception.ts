import ParseException from "./parse.exception";

class NoRegexMatchesFoundException extends ParseException {
    constructor() {
        super("No regex matches found! File is probably empty.");
    }
}

export default NoRegexMatchesFoundException;