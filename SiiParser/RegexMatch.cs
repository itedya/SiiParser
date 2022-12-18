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
}