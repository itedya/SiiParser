class CommentsEngine {
    removeComments(content: string): string {
        let commentStartIndex = 0;
        let inDoubleQuotes = false;
        let inComment = false;
        let inMultilineComment = false;

        for (let i = 0; i < content.length; i++) {
            let prevCharacter = content[i - 1];
            let character = content[i];
            let nextCharacter = content[i + 1];

            if (character === "\"" && prevCharacter !== "\\" && !inComment && !inMultilineComment) {
                inDoubleQuotes = !inDoubleQuotes;
            } else {
                if (character === "/" && nextCharacter === "*" && !inMultilineComment && !inComment) {
                    commentStartIndex = i;
                    inMultilineComment = true;
                } else if (character === "#" && !inComment && !inMultilineComment) {
                    commentStartIndex = i;
                    inComment = true;
                } else if (character === "\n" && inComment) {
                    content = content.replace(content.substring(commentStartIndex, i), "");
                    inComment = false;
                    i = commentStartIndex - 1;
                } else if (character === "*" && nextCharacter === "/" && inMultilineComment) {
                    content = content.replace(content.substring(commentStartIndex, i + 1), "");
                    inMultilineComment = false;
                    i = commentStartIndex - 1;
                }
            }
        }

        return content;
    }
}

export default CommentsEngine;