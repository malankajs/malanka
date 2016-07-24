import {ValueProxy} from '../Data/ValueProxy';
import {IfComponent} from '../Components/IfComponent';

export default function ifHelper(param, options) {
    let isProxy = (param instanceof ValueProxy);

    let getComponent = (value) => {
        if (value && options.content) {
            return options.content.call(this);
        } else if (options.inverse) {
            return options.inverse.call(this);
        }

        return '';
    };

    if (isProxy) {
        var contentProxy = param.pipe(Boolean).pipe(getComponent);

        if (options.isString) {
            return contentProxy;
        } else {
            return new IfComponent(Object.assign({}, options.hash, {
                contentProxy: contentProxy
            }));
        }
    }

    return getComponent(param);
}