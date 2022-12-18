using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class UnitTokenTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public UnitTokenTokenType()
        {
            this.Regex = new Regex("({|}|SiiNunit)");
            this.Identifier = TokenType.UnitToken;
        }
    }
}