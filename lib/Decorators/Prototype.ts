export function Prototype(obj) {
    return function (Class) {
        Object.assign(Class.prototype, obj);
    }
}