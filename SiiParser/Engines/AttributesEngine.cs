using System;
using System.Collections.Generic;
using System.Linq;
using SiiParser.Enums;
using SiiParser.Exceptions;
using SiiParser.TokenTypes;
using SiiParser.TokenTypes.Value;

namespace SiiParser.Engines
{
    public enum AttributeAssignResult
    {
        AbortedAttributeIsArrayLengthIdentifier,
        Success
    }

    public class AttributesEngine
    {
        private List<RegexMatch> Matches { get; set; }
        private List<IValueTokenType> ValueTokenTypes { get; }

        public AttributesEngine(List<RegexMatch> matches, List<IValueTokenType> valueTokenTypes)
        {
            this.Matches = matches;
            this.ValueTokenTypes = valueTokenTypes;
        }

        public void CanAssignAttribute(
            RegexMatch secondRegexMatch,
            RegexMatch thirdRegexMatch
        )
        {
            if (ValueTokenTypes.FirstOrDefault(e => secondRegexMatch.TokenType == e.Identifier) == null)
            {
                throw new ParseException("After attribute name, there should be a value!");
            }

            if (thirdRegexMatch.TokenType != TokenType.NewLine)
            {
                throw new ParseException("After attribute value, there should be a new line!");
            }
        }

        private bool IsAttributeArrayLengthIdentifier(string attributeName)
        {
            string attributeNameWithArrayIdentifier = attributeName + "[]";

            List<RegexMatch> matches = Matches.FindAll(match =>
            {
                if (match.TokenType != TokenType.AttributeName) return false;

                string withRemovedArrayIndex = AttributeNameTokenType.RemoveArrayIndex(match.Value);
                return match.TokenType == TokenType.AttributeName &&
                       withRemovedArrayIndex == attributeNameWithArrayIdentifier;
            });

            return matches.Count >= 1;
        }

        public AttributeAssignResult AssignAttribute(
            ref GameClass gameClass,
            RegexMatch attributeNameMatch,
            RegexMatch valueMatch
        )
        {
            string attributeName = AttributeNameTokenType.RemoveArrayIndex(attributeNameMatch.Value);

            if (IsAttributeArrayLengthIdentifier(attributeName))
            {
                return AttributeAssignResult.AbortedAttributeIsArrayLengthIdentifier;
            }

            bool isArrayItem = attributeName.Contains("[]");

            IValueTokenType valueTokenType = ValueTokenTypes.First(e => valueMatch.TokenType == e.Identifier);

            Object value = valueTokenType.Parse(valueMatch.Value);

            if (isArrayItem)
            {
                if (gameClass[attributeName] == null) gameClass[attributeName] = new List<Object>();
                ((List<Object>)gameClass[attributeName]).Add(value);
            }
            else
            {
                gameClass[attributeName] = value;
            }

            return AttributeAssignResult.Success;
        }
    }
}