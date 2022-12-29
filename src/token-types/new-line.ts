import ITokenType, {TokenIdentifier} from "./token-type";

export class NewLineTokenType implements ITokenType {
    public readonly regex = new RegExp("\n", 'g');
    public readonly identifier = TokenIdentifier.NewLine;
}

export default NewLineTokenType;