module.exports = function (content) {
    var path = this.resourcePath,
        component = path.match(/\/([^\/]+).js$/),
        requires = content.match(/require\(['"][^'"]+['"]\)/g).map(path => path.slice(9, -2)),
        cssModules = requires.filter(path => path.match(/\.css$/)).map(path => JSON.stringify(path));
    
    if (component) {
        component = component[1];
    }
    
    if (component && cssModules.length) {
        var styles = cssModules.map(mod => {
            return `require(${mod})`;
        });
        
        content += `
        if (module.hot) {
            module.hot.accept([${cssModules.join('')}], function() {
                Object.assign(${component}.prototype.styles, ${styles.join(',')});
                
                ${component}.instances.forEach(function(instance) { instance.content = null; instance.render(); });
            });
        }
        `;
    }
    
    return content;
};