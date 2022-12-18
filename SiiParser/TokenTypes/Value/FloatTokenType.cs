using System;
using System.Globalization;
using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes.Value
{
    public class FloatTokenType : IValueTokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }
        
        public FloatTokenType()
        {
            this.Regex = new Regex(@"(?<=(: |:))-?\d+\.\d+(?=[\s\n])");
            this.Identifier = TokenType.Float;
        }
        
        public Object Parse(string rawValue)
        {
            return float.Parse(rawValue, CultureInfo.InvariantCulture);
        }
    }
}