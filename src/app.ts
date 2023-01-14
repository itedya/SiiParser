import 'reflect-metadata';
import CmdArgs from "./cmd-args";
import {Parser} from "./parser";
import {AccessoryTruckData} from "./game-classes/accessory-truck-data";
import AccessoryEngineData from "./game-classes/accessory-engine-data";
import {writeFile} from "fs/promises";
import CountryData from "./game-classes/country-data";
import walk from "./walk";
import LocalizationDb from "./game-classes/localization-db";

const main = async () => {
    const args = CmdArgs.parse();

    const parser = new Parser({
        gameClassTypes: [
            AccessoryEngineData,
            AccessoryTruckData,
            CountryData,
            LocalizationDb
        ],
        throwExceptions: {
            noGameClassFound: !args.ignoreGameClassDoesNotExistException,
            propertyDoesNotExist: !args.ignorePropertyDoesNotExistException
        }
    });

    if (args.directoryPath !== undefined) {
        const items = await Promise.all(await walk(args.directoryPath)
            .then(filePaths => filePaths.filter(filePath => filePath.endsWith(".sii")))
            .then(async filePaths => filePaths.map(async filePath => await parser.parse(filePath, args.rootDirectory))))
            .then(elements => elements.flat(1))
            .catch(err => console.trace(err));

        if (args.output !== undefined) {
            await writeFile(args.output, JSON.stringify(items));
        } else {
            console.log(JSON.stringify(items));
        }
    } else {
        const json = JSON.stringify(await parser.parse(args.filePath!, args.rootDirectory));

        if (args.output !== undefined) {
            await writeFile(args.output, json, {encoding: 'utf-8'});
        } else {
            console.log(json);
        }
    }
}

main();