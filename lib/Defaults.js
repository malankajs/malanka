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
            }
        });
    }
}