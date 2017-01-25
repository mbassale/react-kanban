/**
 * Created by mbassale on 24-01-17.
 */
import * as mobx from 'mobx';

class Task {
    constructor(title = 'New Task', summary = null, description = null) {
        mobx.extendObservable(this, {
            title: title,
            summary: summary,
            description: description
        });
    }
}

export default Task;