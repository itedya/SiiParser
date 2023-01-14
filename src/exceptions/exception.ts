import * as util from "util";

interface ExceptionMetadata {
    filePath: string;
}

class Exception extends Error {
    private filePath: string;

    public assignMetadata(metadata: ExceptionMetadata) {
        this.filePath = metadata.filePath;
    }

    public handle(): void {
        console.error(this.message);
        console.error(`File path: ${this.filePath}`);
        process.exit(1);
    }
}

export default Exception;