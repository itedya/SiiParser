using System.IO;
using System.Text.RegularExpressions;

namespace SiiParser.Engines
{
    // Class that handles @include lines in .sii files
    public class IncludesEngine
    {
        private Regex Regex { get; }
        private string RootDirectory { get; }

        public IncludesEngine(string rootDirectory)
        {
            this.RootDirectory = rootDirectory;
            this.Regex = new Regex(@"@include ?""[a-zA-Z0-9\\_\\./]+""");
        }

        public string Process(string contents, string processedFileDirectory)
        {
            CaptureCollection captures = this.Regex.Match(contents).Captures;
            if (captures.Count == 0) return contents;

            foreach (Capture capture in captures)
            {
                string includeFilePath = capture.Value
                    .Replace("@include \"", "")
                    .Replace("\"", "");

                // Check if file path is absolute
                if (includeFilePath[0] == '/')
                {
                    includeFilePath = Path.Combine(RootDirectory, includeFilePath);
                }
                else
                {
                    includeFilePath = Path.Combine(processedFileDirectory, includeFilePath);
                }

                string includeFileContents = File.ReadAllText(includeFilePath);
                contents = contents.Replace(capture.Value, includeFileContents);
            }

            return contents;
        }
    }
}