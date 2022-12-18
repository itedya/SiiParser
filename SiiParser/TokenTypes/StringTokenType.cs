using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class StringTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }
        public bool IsValueType { get; }


        public StringTokenType()
        {
            this.Regex = new Regex(@"""(?:\\[""\\]|[^\n""\\])*""");
            this.Identifier = TokenType.String;
            this.IsValueType = true;
        }
    }
}