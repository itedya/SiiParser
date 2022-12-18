using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using SiiParser.Attributes;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class ClassTypeTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public ClassTypeTokenType(Type[] gameClasses)
        {
            List<string> classIdentifiers = new List<string>();
            foreach (Type gameClass in gameClasses)
            {
                SiiUnit siiUnit = gameClass.GetCustomAttribute<SiiUnit>();
                classIdentifiers.Add(siiUnit.ClassType);
            }

            this.Regex = new Regex(@"(" + string.Join("|", classIdentifiers) + ")");
            this.Identifier = TokenType.ClassType;
        }
    }
}