export function PlannerWrite() {
    return function(proto, name, desc) {
        return {
            value(...args) {
                let func = desc.value.bind(this),
                    atom = this.env.planner.atom();

                let value = (...args) => {
                    atom.commit(() => func(...args));
                };

                Object.defineProperty(this, name, {value});

                return value.apply(this, args)
            }
        };
    }
}