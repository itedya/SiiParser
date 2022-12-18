using System;
using System.Numerics;
using System.Text.RegularExpressions;
using SiiParser.Classes;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class Vector3IntTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }
        public bool IsValueType { get; }


        public Vector3IntTokenType()
        {
            this.Regex = new Regex(@"(?<=[ :])\(-?\d+, -?\d+, -?\d+\)(?=\n)");
            this.Identifier = TokenType.Vector3Int;
            this.IsValueType = true;
        }

        public static Vector3Int Parse(string value)
        {
            value = value.Substring(0);
            value = value.Substring(value.Length - 1);

            value = value.Replace(" ", "");
            string[] splittedString = value.Split(',');

            return new Vector3Int(int.Parse(splittedString[0]), int.Parse(splittedString[1]),
                int.Parse(splittedString[2]));
        }
    }
}