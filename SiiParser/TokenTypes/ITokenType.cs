using System.Text.RegularExpressions;

namespace SiiParser.TokenTypes
{
    public interface ITokenType
    {
        Regex Regex { get; }
        string Identifier { get; }
    }
}