using System;
using System.Net.Mime;
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
            int start = content.IndexOf("#");
            while (start != -1)
            {
                int end = content.IndexOf("\n", start);
                if (end == -1) end = content.Length - 1;

                content = content.Remove(start, end - start);
                Console.WriteLine("Removing comment at index {0}. Scanning file content {1} / {2}", start,
                    start, content.Length);
                start = content.IndexOf("#", start);
            }

            return content;
        }
    }
}