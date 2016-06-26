import {Component} from '../Component';
import {CollectionComponent} from '../CollectionComponent';

export default function eachHelper(collection, options) {
    return new CollectionComponent({
        tagName: options.hash.tagName,
        collection,
        template: options.content
    });
}