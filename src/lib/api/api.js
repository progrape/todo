import $ from 'jquery';
import * as util from '../util/util';
import constant from '../constant/constant';

export default {
    read(){
        return new Promise((resolve, reject) => {
            const todos = localStorage.getItem(constant.TODOS);
            setTimeout(() => {
                resolve(JSON.parse(todos));
            }, 500);
        });
    },
    write(obj){
        return new Promise((resolve, reject) => {
            const str = JSON.stringify(obj);
            localStorage.setItem(this.constant, str);
            resolve(str);
        });
    }
};