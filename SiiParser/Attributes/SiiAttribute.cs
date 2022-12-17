using System;

namespace SiiParser.Attributes
{
    public class SiiAttribute : Attribute
    {
        public string AttributeName { get; }

        public SiiAttribute(string attributeName)
        {
            this.AttributeName = attributeName;
        }
    }
}