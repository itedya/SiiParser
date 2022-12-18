using System;
using System.Text.RegularExpressions;
using SiiParser.Classes;
using SiiParser.Enums;

namespace SiiParser.TokenTypes.Value
{
    public class Vector3IntTokenType : IValueTokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public Vector3IntTokenType()
        {
            this.Regex = new Regex(@"(?<=[ :])\(-?\d+, -?\d+, -?\d+\)(?=[\s\n])");
            this.Identifier = TokenType.Vector3Int;
        }

        public Object Parse(string value)
        {
            value = value.Substring(1);
            value = value.Substring(0, value.Length - 1);

            value = value.Replace(" ", "");
            string[] splittedString = value.Split(',');

            return new Vector3Int(int.Parse(splittedString[0]), int.Parse(splittedString[1]),
                int.Parse(splittedString[2]));
        }
    }
}