export default function log(...args) {
    console.log(...args.slice(0, -1));
    return '';
}