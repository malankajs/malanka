import {ValueProxy} from './ValueProxy';

export function Mutator(params) {
    return function(Class, name, descriptor) {
        let mutate = descriptor.value;

        return {
            get() {
                let proxy;

                if (Array.isArray(params)) {
                    proxy = ValueProxy.fromArray(params.map(key => this.proxy(key)));
                } else {
                    proxy = this.proxy(params);
                }

                proxy = proxy.mutate(value => {
                    return mutate.call(this, value)
                });

                Object.defineProperty(this, name, {
                    value: proxy
                });

                return proxy;
            }
        };
    }
}