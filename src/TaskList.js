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
            }),

            deleteTask: mobx.action.bound(function (task) {
                let newTasks = [];
                for (let i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i] != task) {
                        newTasks.push(this.tasks[i]);
                    }
                }
                this.tasks = mobx.observable(newTasks);
                for (let i = 0; i < this.tasks.length; i++) {
                    console.log(this.tasks[i].title);
                }
            })
        })
    }
}

export default TaskList;