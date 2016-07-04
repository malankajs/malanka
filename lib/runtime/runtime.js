import {ValueProxy} from '../ValueProxy';

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
            result.push(buffer[0]);
        } else if (buffer.length > 1) {
            let watchers = buffer.filter(node => node instanceof ValueProxy),
                parts = buffer;

            let proxy = ValueProxy.fromArray(watchers).mutate((args) => {
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

            result.push(proxy);
        }

        buffer = [];
    };

    let push = (value) => {
        if (typeof value === 'string' || value instanceof ValueProxy) {
            pushBuffer(value);
        } else if (Array.isArray(value)) {
            mergeStrings(value).forEach(push);
        } else {
            flushBuffer();
            result.push(value);
        }
    };
    
    arr.forEach(push);
    // for (let index = 0; index < arr.length; index++) {
    //     var value = arr[index];
    //
    //     if (typeof value === 'string' || value instanceof ValueProxy) {
    //         pushBuffer(value);
    //     } else if (Array.isArray(value)) {
    //         mergeStrings(value).forEach()
    //     } else {
    //         flushBuffer();
    //         result.push(value);
    //     }
    // }

    flushBuffer();

    return result;
}