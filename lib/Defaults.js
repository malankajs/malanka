/**
 * @param {{styles: {}}} options
 * @returns {Function}
 */
export function Defaults(options) {
    return function (Class) {
        Object.keys(options).forEach(key => {
            Class.prototype[key] = options[key];

            if (key === 'styles') {
                Class.prototype.className = options[key].root;
            } else if (key === 'events') {
                let keys = Object.keys(options[key]);

                for (let index = 0; index < keys.length; index++) {
                    let eventName = keys[index],
                        method = options[key][eventName];

                    options[key][eventName] = function(...args) {
                        return this[method](...args);
                    }
                }
            }
        });
    }
}