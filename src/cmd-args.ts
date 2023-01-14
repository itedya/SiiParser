import commandLineArgs, {OptionDefinition} from "command-line-args";
import InvalidCmdArgsException from "./exceptions/invalid-cmd-args.exception";
import * as fs from "fs";

class CmdArgs {
    public rootDirectory: string;
    public directoryPath?: string;
    public filePath?: string;
    public output?: string;
    public ignoreGameClassDoesNotExistException: boolean;
    public ignorePropertyDoesNotExistException: boolean;


    private static optionDefinitions: OptionDefinition[] = [
        {name: 'root-dir', alias: 'r', type: String},
        {name: 'dir-path', alias: 'd', type: String},
        {name: 'file-path', alias: 'f', type: String},
        {name: 'output', alias: 'o', type: String},
        {name: 'ignore-missing-game-classes', alias: 'g', type: Boolean},
        {name: 'ignore-missing-props', alias: 'p', type: Boolean}
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

        if (parsed['ignore-missing-props'] !== undefined) {
            parsed['ignore-missing-props'] = true;
        }

        if (parsed['ignore-missing-game-classes'] !== undefined) {
            parsed['ignore-missing-game-classes'] = true;
        }

        return new CmdArgs(parsed['root-dir'], parsed['ignore-missing-game-classes'], parsed['ignore-missing-props'], parsed['dir-path'], parsed['file-path'], parsed['output']);
    }

    private constructor(rootDirectory: string, ignoreMissingClasses: boolean, ignoreMissingProps: boolean, dirPath: string | undefined, filePath: string | undefined, output?: string) {
        this.rootDirectory = rootDirectory;
        this.ignoreGameClassDoesNotExistException = ignoreMissingClasses;
        this.ignorePropertyDoesNotExistException = ignoreMissingProps;
        this.directoryPath = dirPath;
        this.filePath = filePath;
        this.output = output;
    }
}

export default CmdArgs;