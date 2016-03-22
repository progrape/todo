
/**
 * debug
 */
export function debug() {
    DEBUG && console.debug.apply(console, arguments);
}