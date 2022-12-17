using System;

namespace SiiParser.Exceptions
{
    public class ParseException : Exception
    {
        public ParseException(string message) : base(String.Format("Parse exception: {0}", message))
        {
        }
    }
}