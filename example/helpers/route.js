/**
 * @param name
 * @param hash
 */
export default function route(name, {hash}) {
    return this.getEnv().router.reverse(name);
}