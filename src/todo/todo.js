import $ from 'jquery';
import uuid from 'node-uuid';
import template from 'art-template/dist/template-debug';
import dataManager from '../lib/dataManager/dataManager';
import * as util from '../lib/util/util';
import styles from './todo.less';
import tpl from 'raw!./todo.html';
import todoItemTpl from 'raw!./todoItem.html';

export default {
    url: '/:status?',
    render: function () {
        return template.compile(tpl)({
            styles: styles
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

        $('#container').on('input', '#todo', function () {
            const value = $(this).val();
            util.debug('inputting ', value);
        }).on('keyup', '#todo', function (e) {
            if (e.keyCode === 13) {
                util.debug('enter');
                const value = $(this).val();
                const todos = dataManager.getData(dataManager.TODOS, []);
                if (!value) {
                    return;
                }
                todos.push({
                    id: uuid.v4(),
                    text: value,
                    status: 0
                });
                dataManager.setData(dataManager.TODOS, todos);
                updateTodos();
                $(this).val('');
            }
        }).on('change', 'input[type=checkbox]', function () {
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
        });

        $('#todo').focus();
    }
};