import IEngine, {ContextData} from "./engine";

class NamespacesEngine implements IEngine {
    async process(contextData: ContextData): Promise<ContextData> {
        const {lineParts, extractedItems} = contextData;
        const gameClass = extractedItems[extractedItems.length - 1];

        gameClass.namespace = lineParts[1];

        extractedItems[extractedItems.length - 1] = gameClass;
        return contextData;
    }
}

export default NamespacesEngine;