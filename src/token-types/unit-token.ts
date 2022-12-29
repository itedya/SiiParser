import ITokenType, {TokenIdentifier} from "./token-type";

export class UnitTokenTokenType implements ITokenType{
    public readonly regex =  new RegExp("({|}|SiiNunit)", 'g');
    public readonly identifier = TokenIdentifier.UnitToken;
}

export default UnitTokenTokenType;