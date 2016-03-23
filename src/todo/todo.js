import $ from 'jquery';
import 'weui.js';
import uuid from 'node-uuid';
import template from 'art-template/dist/template-debug';
import API from '../lib/api/api';
import dataManager from '../lib/dataManager/dataManager';
import * as util from '../lib/util/util';
import styles from './todo.less';
import tpl from 'raw!./todo.html';
import todoItemTpl from 'raw!./todoItem.html';

export default {
    url: '/',
    render: function () {
        const todos = dataManager.getData(dataManager.TODOS, []);
        return template.compile(tpl)({
            todos: todos,
            styles: styles,
            DEBUG: DEBUG
        });
    },
    bind: function () {

        /**
         * update
         */
        function updateTodos() {
            const todos = dataManager.getData(dataManager.TODOS, []);
            const html = template.compile(todoItemTpl)({
                todos: todos,
                styles: styles
            });
            $('.weui_cell:not(:first-child)').remove();
            $('#todos').append(html);
        }

        $('#container').on('keyup', '#todo', function (e) {
            if (e.keyCode === 13) {
                util.debug('enter');
                const title = $(this).val();
                const todos = dataManager.getData(dataManager.TODOS, []);
                if (!title) {
                    return;
                }
                todos.push({
                    id: uuid.v4(),
                    title: title,
                    status: 0,
                    finishTime: util.getLocalISOString(),
                    remark: ''
                });
                dataManager.setData(dataManager.TODOS, todos);
                updateTodos();
                $(this).val('');
            }
        }).on('change', 'label input[type=checkbox]', function () {
            const isChecked = $(this).is(':checked');
            const id = $(this).data('id');
            util.debug('status change', id, isChecked);
            let todos = dataManager.getData(dataManager.TODOS, []);
            todos = todos.map((todo) => {
                if (todo.id == id) {
                    todo.status = isChecked ? 1 : 0;
                }
                return todo;
            });
            dataManager.setData(dataManager.TODOS, todos);
            updateTodos();
        }).on('click', '#deleteAll', function () {
            $.weui.confirm('确定要清空吗?', function (){
                localStorage.clear(API.TODOS);
                location.reload();
            }, function (){

            });
        });

        $('#todo').focus();
    }
};