import {ValueProxy} from '../Data/ValueProxy';
import {WatchComponent} from '../Components/WatchComponent';

export default function watchHelper(...args) {
    let options = args.pop(),
        content = options.content,
        component = args.length === 1 ? args[0] : ValueProxy.all(args);

    if (options.hash.notEmpty) {
        content = function(context) {
            if (component.getValue()) {
                return options.content.call(context, context);
            } else {
                return [];
            }
        }
    }

    return new WatchComponent(Object.assign({}, options.hash, {
        component: component,
        content: content
    }));
}