using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class TokenTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public TokenTokenType()
        {
            this.Regex = new Regex("(?<=[: ])[a-z_]+(?=\n)");
            this.Identifier = TokenType.Token;
        }
    }
}