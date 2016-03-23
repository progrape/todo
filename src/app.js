import 'weui';
import $ from 'jquery';
import 'weui.js';
import attachFastClick from 'fastclick';
import Router from './lib/router/router';
import API from './lib/api/api';
import dataManager from './lib/dataManager/dataManager';
import * as util from './lib/util/util';
import todo from './todo/todo';
import detail from './detail/detail';
attachFastClick.attach(document.body);

$.weui.loading('加载中...');
API.read().then((data) => {
    $.weui.hideLoading();

    for (let key in data) {
        dataManager.setData(key, data[key]);
    }

    const router = new Router();
    router.push(todo).push(detail).setDefault('/').init();
});