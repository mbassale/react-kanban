/**
 * Created by mbassale on 24-01-17.
 */
import * as mobx from 'mobx';

class TaskList {
    constructor(title = 'New Task List', tasks = []) {
        mobx.extendObservable(this, {
            title: title,
            tasks: tasks
        })
    }
}

export default TaskList;