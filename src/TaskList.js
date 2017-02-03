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

            sortTasks: mobx.action.bound(function (priorityTask = null) {
                if (priorityTask) {
                    // no task has same index as priority
                    for (let i = 0; i < this.tasks.length; i++) {
                        if (this.tasks[i] != priorityTask && this.tasks[i].index == priorityTask.index) {
                            if (i < (this.tasks.length - 1)) {
                                this.tasks[i].index++;
                            } else {
                                this.tasks[i].index--;
                            }
                        }
                    }
                }
                // no task has same indexes
                for (let i = 0; i < (this.tasks.length - 1); i++) {
                    if (this.tasks[i].index == this.tasks[i+1].index) {
                        this.tasks[i+1].index++;
                        i--;
                    }
                }
                // sort tasks
                let sortedTasks =  this.tasks.sort((task1, task2) => {
                    if(task1.index < task2.index) {
                        return -1;
                    } else if (task1.index > task2.index) {
                        return 1;
                    }
                    return 0;
                });
                // reindex
                for (let i = 0; i < sortedTasks.length; i++) {
                    sortedTasks[i].index = i;
                }
                this.tasks = sortedTasks;
            }),

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