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
    Vector3 = "VECTOR_3",
    Vector4 = "VECTOR_4",
    Vector2 = "VECTOR_2"
}

export {
    ITokenType as default,
    TokenIdentifier
}