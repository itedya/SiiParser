using System.Collections.Generic;
using System.Globalization;
using SiiParser.Enums;
using SiiParser.Exceptions;
using SiiParser.TokenTypes;

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

        public AttributesEngine(List<RegexMatch> matches)
        {
            this.Matches = matches;
        }

        public void CanAssignAttribute(
            RegexMatch secondRegexMatch,
            RegexMatch thirdRegexMatch
        )
        {
            if (secondRegexMatch.TokenType != TokenType.Float &&
                secondRegexMatch.TokenType != TokenType.Int &&
                secondRegexMatch.TokenType != TokenType.String &&
                secondRegexMatch.TokenType != TokenType.Token)
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

            if (valueMatch.TokenType == TokenType.Int)
            {
                int value = int.Parse(valueMatch.Value);

                if (isArrayItem)
                {
                    if (gameClass[attributeName] == null) gameClass[attributeName] = new List<int>();
                    ((List<int>)gameClass[attributeName]).Add(value);
                }
                else
                {
                    gameClass[attributeName] = value;
                }
            }
            else if (valueMatch.TokenType == TokenType.Float)
            {
                float value = float.Parse(valueMatch.Value, CultureInfo.InvariantCulture);

                if (isArrayItem)
                {
                    if (gameClass[attributeName] == null) gameClass[attributeName] = new List<float>();
                    ((List<float>)gameClass[attributeName]).Add(value);
                }
                else
                {
                    gameClass[attributeName] = value;
                }
            }
            else if (valueMatch.TokenType == TokenType.String || valueMatch.TokenType == TokenType.Token)
            {
                string value = valueMatch.Value.Substring(1);
                value = value.Substring(0, value.Length - 1);

                if (isArrayItem)
                {
                    if (gameClass[attributeName] == null) gameClass[attributeName] = new List<string>();
                    ((List<string>)gameClass[attributeName]).Add(value);
                }
                else
                {
                    gameClass[attributeName] = value;
                }
            }

            return AttributeAssignResult.Success;
        }
    }
}