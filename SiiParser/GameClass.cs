using System;
using System.Linq;
using System.Reflection;
using SiiParser.Attributes;
using SiiParser.Exceptions;

namespace SiiParser
{
    public class GameClass
    {
        public String Namespace { get; set; }

        public object this[string propertyName]
        {
            get
            {
                PropertyInfo[] properties = GetType().GetProperties();
                PropertyInfo property = properties.FirstOrDefault(prop =>
                {
                    SiiAttribute siiAttribute = prop.GetCustomAttribute<SiiAttribute>();
                    if (siiAttribute == null) return false;

                    return siiAttribute.AttributeName == propertyName;
                });

                if (property == null)
                {
                    throw new PropertyDoesNotExistException(String.Format("Property {0} does not exist!", propertyName));
                }

                return property.GetValue(this, null);
            }
            set
            {
                PropertyInfo[] properties = GetType().GetProperties();
                PropertyInfo property = properties.FirstOrDefault(prop =>
                {
                    SiiAttribute siiAttribute = prop.GetCustomAttribute<SiiAttribute>();
                    if (siiAttribute == null) return false;

                    return siiAttribute.AttributeName == propertyName;
                });

                if (property == null)
                {
                    throw new PropertyDoesNotExistException(String.Format("Property {0} does not exist!", propertyName));
                }

                property.SetValue(this, value, null);
            }
        }
    }
}