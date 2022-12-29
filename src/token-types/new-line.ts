import ITokenType, {TokenIdentifier} from "./token-type";

export class NewLineTokenType implements ITokenType {
    public readonly regex = new RegExp("\n");
    public readonly identifier = TokenIdentifier.NewLine;
}

export default NewLineTokenType;