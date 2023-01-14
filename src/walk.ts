import {join} from "path";
import {readdir, lstat} from "fs/promises";

const walk = async (filePath: string): Promise<string[]> => {
    const dir = await readdir(filePath);
    const files = await Promise.all(dir.map(async relativePath => {
        const absolutePath = join(filePath, relativePath);
        const stat = await lstat(absolutePath);

        return stat.isDirectory() ? walk(absolutePath) : absolutePath;
    }));

    return files.flat();
}


export default walk;