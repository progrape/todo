import $ from 'jquery';
import 'weui.js';
import uuid from 'node-uuid';
import template from 'art-template/dist/template-debug';
import dataManager from '../lib/dataManager/dataManager';
import * as util from '../lib/util/util';
import styles from './detail.less';
import tpl from 'raw!./detail.html';

export default {
    url: '/detail/:id',
    render: function () {
        const id = this.params.id;
        const todos = dataManager.getData(dataManager.TODOS, []);
        const todo = todos.filter(todo => todo.id == id)[0];
        return template.compile(tpl)({
            todo: todo,
            styles: styles
        });
    },
    bind: function () {
        const router = this;
        $('#container').on('input', '#title', function () {
            const id = router.params.id;
            const todos = dataManager.getData(dataManager.TODOS, []);
            let todo = todos.filter(todo => todo.id == id)[0];
            const title = $(this).val();
            util.debug('inputting title', title);
            todo.title = title;
            dataManager.setData(dataManager.TODOS, todos);
        }).on('change', '#finishTime', function () {
            const id = router.params.id;
            const todos = dataManager.getData(dataManager.TODOS, []);
            let todo = todos.filter(todo => todo.id == id)[0];
            const finishTime = $(this).val();
            util.debug('finishTime', finishTime);
            todo.finishTime = finishTime;
            dataManager.setData(dataManager.TODOS, todos);
        }).on('change', '#status', function () {
            const id = router.params.id;
            const todos = dataManager.getData(dataManager.TODOS, []);
            let todo = todos.filter(todo => todo.id == id)[0];
            const isChecked = $(this).is(':checked');
            todo.status = isChecked ? 1 : 0;
            dataManager.setData(dataManager.TODOS, todos);
        }).on('input', '#remark', function () {
            const id = router.params.id;
            const todos = dataManager.getData(dataManager.TODOS, []);
            let todo = todos.filter(todo => todo.id == id)[0];
            const remark = $(this).val();
            util.debug('remark', remark);
            todo.remark = remark;
            dataManager.setData(dataManager.TODOS, todos);
        }).on('click', '#back', function () {
            history.go(-1);
        }).on('click', '#delete', function () {
            $.weui.confirm('确定要删除改任务 ?', function () {
                const id = router.params.id;
                const todos = dataManager.getData(dataManager.TODOS, []);
                let todo = todos.filter(todo => todo.id == id)[0];
                util.debug('确定删除');
                dataManager.setData(dataManager.TODOS, util.removeFromArray(todos, todo));
                history.go(-1);
            }, function () {
                util.debug('不删除');
            });
        });
    }
}