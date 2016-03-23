import API from '../api/api';

let data = {};

export default {
    TODOS: 'todos',
    /**
     * set data
     * @param {String} key
     * @param value
     */
    setData (key, value){
        data[key] = value;
        API.write(data);
        return this;
    },
    /**
     * get data
     * @param {String} key
     * @param defaultValue
     * @returns {*}
     */
    getData (key, defaultValue = null){
        return data[key] || defaultValue;
    }
};