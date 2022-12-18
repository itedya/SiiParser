using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using CommandLine;
using Newtonsoft.Json;
using SiiParser;
using SiiParser.Engines;
using SiiParserSCS.GameClasses;
using Parser = SiiParser.Parser;

namespace SiiParserSCS
{
    internal class Program
    {
        public class Options
        {
            [Option('r', "root-dir", Required = true,
                HelpText =
                    @"Game files root directory, see: https://modding.scssoft.com/wiki/Documentation/Engine/Game_data section ""Root Game Folder""")]
            public string RootDirectory { get; set; }

            public int PathSet { get; set; }

            private string _filePath;

            [Option('f', "file-path", Required = false, HelpText = @"Path to file that needs to be parsed")]
            public string FilePath
            {
                get { return _filePath; }
                set
                {
                    PathSet++;
                    _filePath = value;
                }
            }

            private string _directoryPath;

            [Option('d', "dir-path", Required = false, HelpText = @"Directory that has .sii files to decode")]
            public string DirectoryPath
            {
                get { return _directoryPath; }
                set
                {
                    PathSet++;
                    _directoryPath = value;
                }
            }

            [Option('o', "output", Required = false,
                HelpText = @"Output to where data should be written. If not provided, output goes into console.")]
            public string Output { get; set; }
        }

        public static void Main(string[] args)
        {
            CommandLine.Parser.Default.ParseArguments<Options>(args)
                .WithParsed(v =>
                {
                    if (v.PathSet == 0)
                    {
                        Console.WriteLine("You have to pass one of arguments: file-path, dir-path");
                        Environment.Exit(1);
                    }
                    else if (v.PathSet > 1)
                    {
                        Console.WriteLine("You can't provide both arguments (file-path, dir-path) at the same time!");
                        Environment.Exit(1);
                    }

                    if (v.DirectoryPath != null)
                    {
                        RunWithDirectoryPath(v.RootDirectory, v.DirectoryPath, v.Output);
                    }
                    else
                    {
                        RunWithFilePath(v.RootDirectory, v.FilePath, v.Output);
                    }
                })
                .WithNotParsed(v => { Environment.Exit(1); });
        }

        private static void WriteToFile(string fileLocation, List<GameClass> parsedData)
        {
            string json = JsonConvert.SerializeObject(parsedData);
            File.WriteAllText(fileLocation, json);
        }

        private static void WriteToConsole(List<GameClass> parsedData)
        {
            string json = JsonConvert.SerializeObject(parsedData);
            Console.WriteLine(json);
        }

        public static void RunWithFilePath(string rootPath, string filePath, string output)
        {
            string contents = File.ReadAllText(filePath);

            Parser parser = new Parser(new[]
            {
                typeof(CountryData),
                typeof(AccessoryChassisData),
                typeof(AccessoryTruckData),
                typeof(AccessoryTransmissionData),
                typeof(AccessoryTruckData)
            }, false);
            IncludesEngine includesEngine = new IncludesEngine(rootPath);

            List<GameClass> parsed = parser.Parse(includesEngine, contents, filePath);

            if (output == null) WriteToConsole(parsed);
            else WriteToFile(output, parsed);
        }

        public static void RunWithDirectoryPath(string rootPath, string directoryPath, string output)
        {
            Parser parser = new Parser(new[]
            {
                typeof(CountryData),
                typeof(AccessoryChassisData),
                typeof(AccessoryTruckData),
                typeof(AccessoryTransmissionData),
                typeof(AccessoryTruckData)
            }, false);
            IncludesEngine includesEngine = new IncludesEngine(rootPath);

            string[] siiFiles = Directory.GetFiles(directoryPath, "*.sii");

            Debugger.Break();

            List<GameClass> parsed = new List<GameClass>();

            foreach (string siiFilePath in siiFiles)
            {
                string contents = File.ReadAllText(siiFilePath);
                parsed.AddRange(parser.Parse(includesEngine, contents, directoryPath));
            }

            if (output == null) WriteToConsole(parsed);
            else WriteToFile(output, parsed);
        }
    }
}