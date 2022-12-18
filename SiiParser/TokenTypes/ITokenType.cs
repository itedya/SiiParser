using System.Text.RegularExpressions;

namespace SiiParser.TokenTypes
{
    interface ITokenType
    {
        Regex Regex { get; }
        string Identifier { get; }
        bool IsValueType { get; }
    }
}