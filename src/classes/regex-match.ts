import {TokenIdentifier} from "../token-types/token-type";

class RegexMatch {
    public value: string;
    public index: number;

    public get length() {
        return this.value.length;
    }

    public get endIndex() {
        return this.index + length;
    }

    public readonly tokenType: string;

    constructor(value: string, index: number, tokenType: TokenIdentifier) {
        this.value = value;
        this.index = index;
        this.tokenType = tokenType;
    }
}

export default RegexMatch;