using System;

namespace SiiParser.Attributes
{
    public class SiiUnit : Attribute
    {
        public string ClassType { get; }

        public SiiUnit(string classType)
        {
            this.ClassType = classType;
        }
    }
}