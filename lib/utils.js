let hasOwn = Object.hasOwnProperty;

export function escape(value) {
    return String(value)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&#34;')
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