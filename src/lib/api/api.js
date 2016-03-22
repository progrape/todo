import $ from 'jquery';
import * as util from '../util/util';

const TODOS = 'todos';

export default {
    read(){
        return new Promise((resolve, reject) => {
            const todos = localStorage.getItem(TODOS);
            resolve(JSON.parse(todos));
        });
    },
    write(obj){
        return new Promise((resolve, reject) => {
            const str = JSON.stringify(obj);
            localStorage.setItem(TODOS, str);
            resolve(str);
        });
    }
};