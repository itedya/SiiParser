using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class AttributeNameTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }
        public bool IsValueType { get; }

        public AttributeNameTokenType()
        {
            this.Regex = new Regex(@"(?<=\t)\w+(\[(\d+)?\])?(?=:)");
            this.Identifier = TokenType.AttributeName;
            this.IsValueType = false;
        }

        private static Regex ArrayIndexRegex { get; } = new Regex(@"(?<=\[)\d+(?=\])");

        public static string RemoveArrayIndex(string attributeName)
        {
            return ArrayIndexRegex.Replace(attributeName, "");
        }
    }
}