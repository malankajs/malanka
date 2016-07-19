import {ValueProxy} from '../ValueProxy';

/**
 * @param {[]} parts
 * @returns {ValueProxy|string}
 */
export function toProxy(parts) {
    let watchers = parts.filter(node => node instanceof ValueProxy);

    if (!watchers.length) {
        return parts.join('');
    }

    return ValueProxy.all(watchers).pipe((args) => {
        let index = 0;

        return parts
            .map(value => {
                if (value instanceof ValueProxy) {
                    return args[index++];
                } else {
                    return value;
                }
            })
            .join('');
    });
}

/**
 * @param {{}[]} arr
 *
 * @returns {[]}
 */
export function mergeStrings(arr) {
    let result = [], buffer = [];

    if (!Array.isArray(arr)) {
        return arr;
    }

    let pushBuffer = value => {
        if (buffer.length && typeof value !== 'object' && typeof buffer[buffer.length - 1] === 'string') {
            buffer.push(String(buffer.pop()) + value);
        } else {
            buffer.push(value);
        }
    };

    let flushBuffer = () => {
        if (buffer.length === 1) {
            if (!(typeof buffer[0] === 'string' && buffer[0].trim() === '')) {
                result.push(buffer[0]);
            }
        } else if (buffer.length > 1) {
            result.push(toProxy(buffer));
        }

        buffer = [];
    };

    let push = (value) => {
        // skip null values
        if (value == null) {
            return;
        }

        // strings, booleans, numbers and ValueProxies
        if (typeof value !== 'object' || value instanceof ValueProxy) {
            pushBuffer(value);
        } else if (Array.isArray(value)) {
            mergeStrings(value).forEach(push);
        } else {
            flushBuffer();
            result.push(value);
        }
    };
    
    arr.forEach(push);

    flushBuffer();

    return result;
}

/**
 * @param {[]} arr
 * @returns {ValueProxy|string}
 */
export function join(arr) {
    if (arr.length === 1) {
        return arr[0];
    } else if (arr.length === 0) {
        return '';
    }

    return toProxy(arr);
}