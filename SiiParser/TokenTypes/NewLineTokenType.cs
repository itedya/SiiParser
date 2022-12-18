using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class NewLineTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }
        public bool IsValueType { get; }


        public NewLineTokenType()
        {
            this.Regex = new Regex("\n");
            this.Identifier = TokenType.NewLine;
            this.IsValueType = false;
        }
    }
}