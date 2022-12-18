using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;
using SiiParser.Attributes;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class NamespaceTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }

        public NamespaceTokenType(Type[] gameClasses)
        {
            List<string> classIdentifiers = new List<string>();
            foreach (Type gameClass in gameClasses)
            {
                SiiUnit siiUnit = gameClass.GetCustomAttribute<SiiUnit>();
                classIdentifiers.Add(siiUnit.ClassType);
            }

            this.Regex = new Regex("(?<=(" + string.Join("|", classIdentifiers) + ") : )[a-zA-Z0-9_.]+(?=\n)");
            this.Identifier = TokenType.Namespace;
        }
    }
}