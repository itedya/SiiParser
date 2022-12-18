using System;

namespace SiiParser.TokenTypes.Value
{
    public interface IValueTokenType : ITokenType
    {
        Object Parse(string rawValue);
    }
}