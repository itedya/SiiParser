using System;
using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes.Value
{
    public class IntTokenType : IValueTokenType
    {
        public string Identifier { get; }
        public Regex Regex { get; }


        public IntTokenType()
        {
                this.Regex = new Regex(@"(?<=(: |:))-?\d+(?=[\s\n])");
            this.Identifier = TokenType.Int;
        }

        public Object Parse(string rawValue)
        {
            return int.Parse(rawValue);
        }
    }
}