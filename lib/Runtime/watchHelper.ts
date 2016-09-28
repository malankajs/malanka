import {ValueProxy} from '../Data/ValueProxy';
import {WatchComponent} from '../Components/WatchComponent';

export default function watchHelper(...args) {
    let options = args.pop(),
        content = options.content,
        value = args.length === 1 ? args[0] : ValueProxy.all(args);

    if (options.hash.notEmpty) {
        let previous = '';

        content = function(context) {
            if (value.getValue()) {
                return previous = options.content.call(context, context);
            } else {
                return previous;
            }
        }
    }

    return new WatchComponent(Object.assign({}, options.hash, {value,  content}));
}
