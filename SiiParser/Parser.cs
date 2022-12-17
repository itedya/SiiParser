using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using SiiParser.Attributes;
using SiiParser.Engines;
using SiiParser.Enums;
using SiiParser.TokenTypes;
using SiiParser.Exceptions;

namespace SiiParser
{
    public class RegexMatch
    {
        public string Value { get; }
        public int Index { get; }
        public int Length { get; }

        public int EndIndex { get; }
        public string TokenType { get; }

        public RegexMatch(string value, int index, int length, string tokenTypeIdentifier)
        {
            this.Value = value;
            this.Index = index;
            this.Length = length;
            this.EndIndex = index + length;
            this.TokenType = tokenTypeIdentifier;
        }
    }

    public class Parser
    {
        private List<Type> ClassTypes { get; }
        private List<ITokenType> TokenTypes { get; }
        private bool ThrowNotDefinedPropertyExceptions { get; }

        public Parser(Type[] classTypes, bool throwNotDefinedPropertyExceptions)
        {
            this.ClassTypes = classTypes.ToList();
            this.ThrowNotDefinedPropertyExceptions = throwNotDefinedPropertyExceptions;

            this.TokenTypes = new List<ITokenType>();
            TokenTypes.Add(new AttributeNameTokenType());
            TokenTypes.Add(new ClassTypeTokenType());
            TokenTypes.Add(new FloatTokenType());
            TokenTypes.Add(new IntTokenType());
            TokenTypes.Add(new NamespaceTokenType());
            TokenTypes.Add(new NewLineTokenType());
            TokenTypes.Add(new StringTokenType());
            TokenTypes.Add(new TokenTokenType());
            TokenTypes.Add(new UnitTokenTokenType());
        }

        private List<RegexMatch> ProcessMatchCollection(
            List<RegexMatch> regexMatches,
            ITokenType tokenType,
            MatchCollection matchCollection
        )
        {
            foreach (Match match in matchCollection)
            {
                regexMatches.Add(new RegexMatch(match.Value, match.Index, match.Length, tokenType.Identifier));
            }

            return regexMatches;
        }

        private Type GetGameClassFromIdentifier(String identifier)
        {
            return ClassTypes.Find(ele =>
            {
                if (!Attribute.IsDefined(ele, typeof(SiiUnit)))
                {
                    throw new Exception("Game class missing SiiUnit Attribute!");
                }

                return ele.GetCustomAttribute<SiiUnit>().ClassType == identifier;
            });
        }

        public List<GameClass> Parse(IncludesEngine includesEngine, string content, string filePath)
        {
            CommentsEngine commentsEngine = new CommentsEngine();
            UnitTokensEngine unitTokensEngine = new UnitTokensEngine();

            // Remove comments
            content = commentsEngine.RemoveComments(content);
            // Process @include directives
            content = includesEngine.Process(content, Path.GetDirectoryName(filePath));
            // Remove comments that were in included files
            content = commentsEngine.RemoveComments(content);

            List<RegexMatch> regexMatches = new List<RegexMatch>();

            foreach (ITokenType tokenType in TokenTypes)
            {
                regexMatches = ProcessMatchCollection(regexMatches, tokenType, tokenType.Regex.Matches(content));
            }

            regexMatches = regexMatches.OrderBy(o => o.Index).ToList();

            if (regexMatches.Count == 0)
            {
                throw new ParseException("No matches found, file is probably empty.");
            }

            AttributesEngine attributesEngine = new AttributesEngine(regexMatches);

            List<GameClass> items = new List<GameClass>();

            for (var i = 0; i < regexMatches.Count; i++)
            {
                RegexMatch regexMatch = regexMatches[i];
                GameClass firstItem = (items.Count == 0) ? null : items.Last();

                // Process New Line
                if (regexMatch.TokenType == TokenType.NewLine) continue;

                // Process Unit Token and Unit Initialization Token
                if (regexMatch.TokenType == TokenType.UnitToken)
                {
                    unitTokensEngine.UnitTokenUsage(regexMatch.Value);
                    continue;
                }

                // Assign Game class
                if (regexMatch.TokenType == TokenType.ClassType)
                {
                    if (!unitTokensEngine.CanCreateClass())
                    {
                        throw new ParseException(
                            "Can't create class, invalid usage of unit tokens! Invalid file contents.");
                    }

                    // Check if next match is namespace token (if it is, file contents are correct)
                    if (regexMatches[i + 1].TokenType != TokenType.Namespace)
                    {
                        throw new ParseException("After class type definition, there should be a namespace!");
                    }

                    // Get Game Class type from string identifier (for ex. accessory_truck_data = AccessoryTruckData class)
                    Type type = GetGameClassFromIdentifier(regexMatch.Value);

                    // Create instance of game class and add it to parsed items
                    items.Add((GameClass)Activator.CreateInstance(type));
                }
                // assign namespace
                else if (regexMatch.TokenType == TokenType.Namespace)
                {
                    if (!unitTokensEngine.CanAssignNamespace())
                    {
                        throw new ParseException(
                            "Can't assign namespace, invalid usage of unit tokens! Invalid file contents.");
                    }

                    firstItem.Namespace = regexMatch.Value;
                }
                else if (regexMatch.TokenType == TokenType.AttributeName)
                {
                    // Validation
                    if (!unitTokensEngine.CanAssignAttribute())
                    {
                        throw new ParseException(
                            "Can't assign attributes, invalid usage of unit tokens! Invalid file contents.");
                    }

                    attributesEngine.CanAssignAttribute(regexMatches[i + 1], regexMatches[i + 2]);

                    try
                    {
                        attributesEngine.AssignAttribute(ref firstItem, regexMatch, regexMatches[i + 1]);
                    }
                    catch (PropertyDoesNotExistException e)
                    {
                        if (ThrowNotDefinedPropertyExceptions) throw e;
                    }

                    i += 2;
                }
                else if (regexMatch.TokenType == TokenType.Float ||
                         regexMatch.TokenType == TokenType.Int ||
                         regexMatch.TokenType == TokenType.String ||
                         regexMatch.TokenType == TokenType.Token)
                {
                    throw new ParseException(String.Format("Parser didn't see any attribute name to value: {0}",
                        regexMatch.Value));
                }

                if (firstItem != null)
                {
                    items[items.Count - 1] = firstItem;
                }
            }

            return items;
        }
    }
}