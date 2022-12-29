interface ITokenType {
    regex: RegExp;
    identifier: TokenIdentifier;
}

enum TokenIdentifier {
    AttributeName = "ATTRIBUTE_NAME",
    ClassType = "CLASS_TYPE",
    Float = "FLOAT",
    Int = "INT",
    Namespace = "NAMESPACE",
    NewLine = "NEW_LINE",
    String = "STRING",
    Token = "TOKEN",
    UnitToken = "UNIT_TOKEN",
    Vector3Int = "VECTOR_3_INT",
    Vector4 = "VECTOR_4",
}

export {
    ITokenType as default,
    TokenIdentifier
}