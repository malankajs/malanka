import {ValueProxy} from '../Data/ValueProxy';

export function Mutator(params, {before, after} = {}) {
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
                    proxy = ValueProxy.all(params.map(key => toProxy(key)));
                } else {
                    proxy = toProxy(params);
                }

                if (before) {
                    proxy = before.call(this, proxy);
                }

                proxy = proxy.pipe(value => {
                    return mutate.call(this, value)
                });

                if (after) {
                    proxy = after.call(this, proxy);
                }

                Object.defineProperty(this, name, {
                    value: proxy
                });

                return proxy;
            }
        };
    }
}
