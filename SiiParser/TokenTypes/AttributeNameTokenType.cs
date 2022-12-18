using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class AttributeNameTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public AttributeNameTokenType()
        {
            this.Regex = new Regex(@"(?<=\n(\t|\s+))\w+(\[(\d+)?\])?(?=:)");
            this.Identifier = TokenType.AttributeName;
        }

        private static Regex ArrayIndexRegex { get; } = new Regex(@"(?<=\[)\d+(?=\])");

        public static string RemoveArrayIndex(string attributeName)
        {
            return ArrayIndexRegex.Replace(attributeName, "");
        }
    }
}