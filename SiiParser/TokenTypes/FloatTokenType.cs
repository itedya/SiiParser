using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class FloatTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public FloatTokenType()
        {
            this.Regex = new Regex(@"(?<=[ :])-?\d+\.\d+(?=\n)");
            this.Identifier = TokenType.Float;
        }
    }
}