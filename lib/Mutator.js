import {ValueProxy} from './ValueProxy';

export function Mutator(params) {
    return function(Class, name, descriptor) {
        let mutate = descriptor.value;

        return {
            get() {
                let sources = params.map(key => this.proxy(key));

                let proxy = ValueProxy.fromArray(sources).mutate(value => {
                    return mutate.call(this, value);
                });

                Object.defineProperty(this, name, {
                    value: proxy
                });

                return proxy;
            }
        };
    }
}