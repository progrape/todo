import $ from 'jquery';
import * as util from '../util/util';

export default {
    TODOS: 'todos',
    read(){
        return new Promise((resolve, reject) => {
            const todos = localStorage.getItem(this.TODOS);
            setTimeout(() => {
                resolve(JSON.parse(todos));
            }, 500);
        });
    },
    write(obj){
        return new Promise((resolve, reject) => {
            const str = JSON.stringify(obj);
            localStorage.setItem(this.TODOS, str);
            resolve(str);
        });
    }
};