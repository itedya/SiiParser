import commandLineArgs, {OptionDefinition} from "command-line-args";
import InvalidCmdArgsException from "./exceptions/invalid-cmd-args";
import * as fs from "fs";

class CmdArgs {
    public rootDirectory: string;
    public directoryPath?: string;
    public filePath?: string

    private static optionDefinitions: OptionDefinition[] = [
        {name: 'root-dir', alias: 'v', type: String},
        {name: 'dir-path', alias: 'd', type: String},
        {name: 'file-path', alias: 'f', type: String}
    ];

    public static parse() {
        const parsed = commandLineArgs(this.optionDefinitions, {caseInsensitive: true, stopAtFirstUnknown: true});
        if (parsed['root-dir'] === undefined) {
            throw new InvalidCmdArgsException("You must provide root directory!");
        }

        if (!fs.existsSync(parsed['root-dir'])) {
            throw new InvalidCmdArgsException("Provided root directory does not exist.");
        }

        if (parsed['dir-path'] === undefined && parsed['file-path'] === undefined) {
            throw new InvalidCmdArgsException("You must provide directory path or file path!");
        }

        if (parsed['dir-path'] !== undefined && parsed['file-path'] !== undefined) {
            throw new InvalidCmdArgsException("You can't provide dir path and file path at the same time!");
        }

        if (parsed['dir-path'] !== undefined && !fs.existsSync(parsed['dir-path'])) {
            throw new InvalidCmdArgsException("Provided directory path does not exist.");
        }

        if (parsed['file-path'] !== undefined) {
            if (!fs.existsSync(parsed['file-path'])) {
                throw new InvalidCmdArgsException("Provided file path does not exist.");
            }

            if (!fs.statSync(parsed['file-path']).isFile()) {
                throw new InvalidCmdArgsException("Provided file path goes to directory instead of file.");
            }
        }

        return new CmdArgs(parsed['root-dir'], parsed['dir-path'], parsed['file-path']);
    }

    private constructor(rootDirectory: string, dirPath: string | undefined, filePath: string | undefined) {
        this.rootDirectory = rootDirectory;
        this.directoryPath = dirPath;
        this.filePath = filePath;
    }
}

export default CmdArgs;