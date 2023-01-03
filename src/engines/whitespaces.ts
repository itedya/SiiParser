class WhitespacesEngine {
    private removeByIndex(str: string, index: number) {
        return str.slice(0, index) + str.slice(index + 1);
    }

    private filterString(input: string): string {
        let inDoubleColons = false;

        for (let i = 0; i < input.length; i++) {
            const character = input[i];

            if (character === '"') {
                inDoubleColons = !inDoubleColons;
                continue;
            }

            if (/\s/.test(character) && !inDoubleColons) {
                input = this.removeByIndex(input, i);
                i--;
            }
        }

        return input;
    }

    public process(content: string) {
        return content.split("\n")
            .filter(line => line !== "")
            .map(line => this.filterString(line))
            .filter(line => line !== "")
            .join("\n");
    }
}

export default WhitespacesEngine;