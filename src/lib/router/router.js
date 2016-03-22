import pathToRegexp from 'path-to-regexp';
import * as util from './util';

/**
 * simple router
 */
class Router {
    /**
     * constructor
     * @param options
     */
    constructor(options) {
        this._options = util.extend({
            container: '#container',
            enter: 'enter',
            enterActive: 'enter-active',
            enterTimeout: 0,
            leave: 'leave',
            leaveActive: 'leave-active',
            leaveTimeout: 0
        }, options);
        this._$contaienr = document.querySelector(this._options.container);
        this._routes = [];
        this._default = null;
    }

    /**
     * initial
     * @returns {Router}
     */
    init() {
        window.addEventListener('hashchange', (event) => {
            const hash = util.getHash(event.newURL);
            this.go(hash);
        }, false);

        const hash = util.getHash(location.href);
        const route = this._getRoute(hash);
        if (route) {
            this.go(hash);
        }
        else {
            this.go(this._default);
        }

        return this;
    }

    /**
     * push route config into routes array
     * @param route
     * @returns {Router}
     */
    push(route) {
        route = util.extend({
            url: '*',
            className: '',
            render: util.noop,
            bind: util.noop
        }, route);
        this._routes.push(route);
        return this;
    }

    /**
     * set default url when no matcher was found
     * @param url
     * @returns {Router}
     */
    setDefault(url) {
        this._default = url;
        return this;
    }

    /**
     * go to the url
     * @param hash
     * @returns {Router}
     */
    go(hash) {
        const route = this._getRoute(hash);
        if (route) {
            const html = typeof route.render === 'function' ? route.render(route.params) : '';

            // if have child already
            const hasChildren = this._$contaienr.hasChildNodes();
            if (hasChildren) {
                let child = this._$contaienr.childNodes[0];
                child.classList.add(this._options.leave);
                child.classList.add(this._options.leaveActive);

                if (this._options.leaveTimeout > 0) {
                    setTimeout(() => {
                        child.parentNode.removeChild(child);
                    }, this._options.leaveTimeout);
                }
                else {
                    child.parentNode.removeChild(child);
                }

            }

            let node = document.createElement('div');

            // add class name
            if (route.className){
                node.classList.add(route.className);
            }
            // add class
            if (hasChildren) {
                node.classList.add(this._options.enter);
            }
            node.innerHTML = html;
            this._$contaienr.appendChild(node);
            if (hasChildren) {
                node.classList.add(this._options.enterActive);
            }

            if (this._options.enterTimeout > 0) {
                setTimeout(() => {
                    node.classList.remove(this._options.enter);
                    node.classList.remove(this._options.enterActive);
                }, this._options.enterTimeout);
            }
            else {
                node.classList.remove(this._options.enter);
                node.classList.remove(this._options.enterActive);
            }


            location.hash = `#${hash}`;

            if (typeof route.bind === 'function' && !route.__isBind) {
                route.bind();
                route.__isBind = true;
            }
        }
        else {
            throw new Error(`url ${hash} was not found`);
        }
        return this;
    }

    /**
     * get route config by hash
     * @param hash
     * @returns {*}
     * @private
     */
    _getRoute(hash) {
        for (let i = 0, len = this._routes.length; i < len; i++) {
            let route = this._routes[i];
            let keys = [];
            const regex = pathToRegexp(route.url, keys);
            const match = regex.exec(hash);
            if (match) {
                route.params = {};
                for (let j = 0, l = keys.length; j < l; j++) {
                    const key = keys[j];
                    const name = key.name;
                    route.params[name] = match[j + 1];
                }
                return route;
            }
        }
        return null;
    }
}

export default Router;