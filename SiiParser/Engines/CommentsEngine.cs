using System.Text.RegularExpressions;

namespace SiiParser.Engines
{
    public class CommentsEngine
    {
        private Regex Regex { get; }

        public CommentsEngine()
        {
            this.Regex = new Regex(@"((/*(.|\n)+\*/)|(#.*))");
        }
        
        public string RemoveComments(string content)
        {
            return this.Regex.Replace(content, "");
        }
    }
}