var TemplateCompiler = require('./TemplateCompiler').TemplateCompiler;

module.exports = function(content) {
    this.cacheable();

    var template = new TemplateCompiler(this.options.scanner).compileString(content);
    console.log(template);
    
    return template;
};