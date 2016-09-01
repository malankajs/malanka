import {CollectionComponent} from '../Components/CollectionComponent';

export default function eachHelper(collection, options) {
    // For simple array we don't need create wrapper
    // if no additional params was not passed
    if (Array.isArray(collection) && !Object.keys(options.hash).length) {
        if (collection.length) {
            if (options.content) {
                return collection.map(options.content);
            }
        } else if (options.inverse) {
            return options.inverse.call(this);
        }
    } else {
        let params = {
            collection,
            childTemplate: options.content,
            emptyTemplate: options.inverse
        };

        return new CollectionComponent(Object.assign(params, options.hash));
    }
}
