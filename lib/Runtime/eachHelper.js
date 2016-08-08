import {CollectionComponent} from '../Components/CollectionComponent';

export default function eachHelper(collection, options) {
    let params = {
        collection,
        childTemplate: options.content,
        emptyTemplate: options.inverse
    };

    return new CollectionComponent(Object.assign(params, options.hash));
}