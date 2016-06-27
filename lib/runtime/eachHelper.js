import {CollectionComponent} from '../CollectionComponent';

export default function eachHelper(collection, options) {
    var component = new CollectionComponent(Object.assign({collection, template: options.content}, options.hash));

    console.log(component);

    return component;
}