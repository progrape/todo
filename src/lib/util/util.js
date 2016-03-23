
/**
 * debug
 */
export function debug() {
    DEBUG && console.debug.apply(console, arguments);
}

/**
 * get local iso string
 * @returns {string}
 */
export function getLocalISOString() {
    const now = new Date();

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    return now.getFullYear() + '-'
        + pad(now.getMonth() + 1) + '-'
        + pad(now.getDate()) + 'T'
        + pad(now.getHours()) + ':'
        + pad(now.getMinutes()) + ':'
        + pad(now.getSeconds());
}

/**
 * remove item from array
 * @param {Array} array
 * @param item
 * @returns {Array}
 */
export function removeFromArray(array, item) {
    let i = array.indexOf(item);
    if (i != -1) {
        array.splice(i, 1);
    }
    return array;
}