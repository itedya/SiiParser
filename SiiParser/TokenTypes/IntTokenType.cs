using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class IntTokenType : ITokenType
    {
        public string Identifier { get; }
        public Regex Regex { get; }
        public bool IsValueType { get; }


        public IntTokenType()
        {
            this.Regex = new Regex(@"(?<=[ :])-?\d+(?=\n)");
            this.Identifier = TokenType.Int;
            this.IsValueType = true;
        }
    }
}