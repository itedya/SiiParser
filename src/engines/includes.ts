import path from "path";
import {readFile} from "fs/promises";

/**
 * Class used to deal with @include "..." clauses
 */
class IncludesEngine {
    private regex: RegExp;
    private readonly rootDirectory: string;

    constructor(rootDirectory: string) {
        this.rootDirectory = rootDirectory;
        this.regex = new RegExp("@include ?\"[a-zA-Z0-9_./]+\"", 'g');
    }

    public async process(content: string, processedFileDirectoryPath: string) {
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

            let includeFileContents = await readFile(includeFilePath, {encoding: 'utf-8'});
            content = content.replaceAll(match, includeFileContents);
        }

        return content;
    }
}

export default IncludesEngine;