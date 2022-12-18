using System.Globalization;
using System.Numerics;
using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes.Value
{
    public class Vector4TokenType : IValueTokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public Vector4TokenType()
        {
            this.Regex = new Regex(@"(?<=(: |:))\(-?\d+\.\d+, -?\d+\.\d+, -?\d+\.\d+, -?\d+\.\d+\)(?=[\s\n])");
            this.Identifier = TokenType.Vector4;
        }
        public object Parse(string value)
        {
            value = value.Substring(1);
            value = value.Substring(0, value.Length - 1);

            value = value.Replace(" ", "");
            string[] splittedString = value.Split(',');

            return new Vector4(
                float.Parse(splittedString[0], CultureInfo.InvariantCulture), 
                float.Parse(splittedString[1], CultureInfo.InvariantCulture),
                float.Parse(splittedString[2], CultureInfo.InvariantCulture),
                float.Parse(splittedString[3], CultureInfo.InvariantCulture)
                );
        }
    }
}