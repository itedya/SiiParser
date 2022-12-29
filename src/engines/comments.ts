class CommentsEngine {
    private regex: RegExp = new RegExp("((/*(.|\n)+\\*/)|(#.*))", 'g');

    removeComments(content: string): string {
        const matches = [...new Set([...content.matchAll(this.regex)].map(match => match[0]))];
        if (matches.length === 0) {
            return content;
        }

        return content.replaceAll(this.regex, "");
    }
}
export default CommentsEngine;