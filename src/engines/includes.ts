import path from "path";
import * as fs from "fs";

export class IncludesEngine {
    private regex: RegExp;
    private rootDirectory: string;

    constructor(rootDirectory: string) {
        this.rootDirectory = rootDirectory;
        this.regex = new RegExp("@include ?\"[a-zA-Z0-9_./]+\"", 'g');
    }

    public process(content: string, processedFileDirectoryPath: string) {
        const matches = [...new Set([...content.matchAll(this.regex)].map(match => match[0]))];
        if (matches.length === 0) {
            return content;
        }

        for (const match of matches) {
            let includeFilePath = match.replace("@include \"", "")
                .replace("\"", "");

            if (includeFilePath[0] === '/') {
                includeFilePath = path.join(this.rootDirectory, includeFilePath);
            } else {
                includeFilePath = path.join(processedFileDirectoryPath, includeFilePath);
            }

            let includeFileContents = fs.readFileSync(includeFilePath, { encoding: 'utf-8' });
            content = content.replaceAll(match, includeFileContents);
        }

        return content;
    }
}

export default IncludesEngine;