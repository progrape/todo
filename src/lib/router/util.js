/**
 * extend
 * @param target
 * @param source
 * @returns {*}
 */
export function extend(target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
}

/**
 * get hash by full url
 * @param url
 * @returns {string}
 */
export function getHash(url) {
    return url.indexOf('#') !== -1 ? url.substring(url.indexOf('#') + 1) : '/';
}

/**
 * noop
 */
export function noop() {

}