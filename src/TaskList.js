/**
 * Created by mbassale on 24-01-17.
 */
import * as mobx from 'mobx';
import Task from './Task';

class TaskList {
    constructor(title = 'New Task List', tasks = []) {
        mobx.extendObservable(this, {
            title: title,
            tasks: tasks,

            newTask: mobx.action.bound(function () {
                this.tasks.push(new Task());
            })
        })
    }
}

export default TaskList;