/**
 * Created by mbassale on 24-01-17.
 */
import * as mobx from 'mobx';

class Task {
    constructor(index = 0, title = 'New Task', summary = null, description = null) {
        mobx.extendObservable(this, {
            index: index,
            title: title,
            summary: summary,
            description: description
        });
    }
}

export default Task;