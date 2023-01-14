import ITokenType, {TokenIdentifier} from "./token-type";

class AttributeNameTokenType implements ITokenType {
    public readonly regex: RegExp;
    public readonly identifier = TokenIdentifier.AttributeName;

    constructor() {
        this.regex = new RegExp("^\\w+(\\[(\\d+)?])?(?=:)", 'gm');
    }


}

export default AttributeNameTokenType;