import ITokenType from "../token-type";

interface IValueTokenType<T> extends ITokenType {
    parse(rawValue: string): T;
}

export default IValueTokenType;