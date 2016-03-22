import 'weui';
import $ from 'jquery';
import attachFastClick from 'fastclick';
import Router from './lib/router/router';
import todo from './todo/todo';
attachFastClick.attach(document.body);

const router = new Router();
router.push(todo).setDefault('/').init();