var TemplateCompiler = require('./TemplateCompiler').TemplateCompiler;

module.exports = function(content) {
    this.cacheable();

    return new TemplateCompiler(this.options.scanner).compileString(content);
};