interface IValueTokenType<T> extends ITokenType {
    parse(rawValue: string): T;
}

export default IValueTokenType;