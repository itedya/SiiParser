using System;

namespace SiiParser.Exceptions
{
    public class PropertyDoesNotExistException : Exception
    {
        public PropertyDoesNotExistException(string propertyName) : base(String.Format("Property {0} does not exist!",
            propertyName))
        {
        }
    }
}