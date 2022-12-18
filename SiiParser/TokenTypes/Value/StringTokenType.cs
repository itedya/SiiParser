using System;
using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes.Value
{
    public class StringTokenType : IValueTokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public StringTokenType()
        {
            this.Regex = new Regex(@"""(?:\\[""\\\\n]|[^\n""\\])*""");
            this.Identifier = TokenType.String;
        }

        public Object Parse(string rawValue)
        {
            rawValue = rawValue.Substring(1);
            rawValue = rawValue.Substring(0, rawValue.Length - 1);
            return rawValue;
        }
    }
}