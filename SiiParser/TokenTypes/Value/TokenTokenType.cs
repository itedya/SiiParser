using System;
using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes.Value
{
    public class TokenTokenType : IValueTokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public TokenTokenType()
        {
            this.Regex = new Regex(@"(?<=(\n(\t|\s+))(\w+(\[(\d+)?\])?)(:|: ))[a-z_]+(?=[\s\n])");
            this.Identifier = TokenType.Token;
        }

        public Object Parse(string rawValue)
        {
            return rawValue;
        }
    }
}