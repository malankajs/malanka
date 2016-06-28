import {CollectionComponent} from '../CollectionComponent';

export default function eachHelper(collection, options) {
    return new CollectionComponent(Object.assign({collection, template: options.content}, options.hash));
}