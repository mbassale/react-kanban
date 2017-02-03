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

            sortTasks: function () {
                this.tasks = this.tasks.sort((task1, task2) => {
                    return task1.index < task2.index ? -1 : 1;
                });
            },

            newTask: mobx.action.bound(function () {
                let maxIndex = this.tasks.reduce((maxIndex, task) => {
                    return maxIndex < task.index ? task.index : maxIndex;
                }, -1);
                this.tasks.push(new Task(maxIndex+1));
                this.sortTasks();
            }),

            deleteTask: mobx.action.bound(function (task) {
                let newTasks = [];
                for (let i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i] != task) {
                        newTasks.push(this.tasks[i]);
                    }
                }
                this.tasks = mobx.observable(newTasks);
                this.sortTasks();
            })
        })
    }
}

export default TaskList;