export class TemplateNodeCompiled {
    public content: string;

    /**
     * @param {string} content
     * @param {{}} options
     */
    constructor(content, options) {
        this.content = content;

        Object.assign(this, options)
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.content;
    }

}
