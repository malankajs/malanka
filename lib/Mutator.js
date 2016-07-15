import {ValueProxy} from './ValueProxy';

export function Mutator(params) {
    return function(Class, name, descriptor) {
        let mutate = descriptor.value;

        return {
            get() {
                let proxy;

                let toProxy = str => {
                    let parts = str.split('.'),
                        proxy = this.proxy(parts.shift());

                    for (var index = 0; index < parts.length; index++) {
                        var part = parts[index];

                        proxy = proxy.proxy(part);
                    }

                    return proxy;
                };

                if (Array.isArray(params)) {
                    proxy = ValueProxy.fromArray(params.map(key => toProxy(key)));
                } else {
                    proxy = toProxy(params);
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