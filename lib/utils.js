let hasOwn = Object.hasOwnProperty;

/**
 * @param {string} value
 * @returns {string}
 */
export function escape(value) {
    return String(value)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * @param {string} value
 * @returns {string}
 */
export function escapeAttribute(value) {
    return escape(value).replace(/"/g, '&#34;');
}

/**
 * @param {object} obj
 * @param {string} key
 *
 * @returns {*}
 */
export function result(obj, key) {
    let value;

    if (hasOwn.call(obj.options, key)) {
        value = obj.options[key];
    } else {
        value = obj[key];
    }

    if (typeof value === 'function') {
        return value.call(obj);
    } else {
        return value;
    }
}