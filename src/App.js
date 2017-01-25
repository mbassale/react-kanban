import React, {Component} from 'react';
import './App.css';
import MenuBar from './MenuBar';
import KanbanBoard from './KanbanBoard';
import TaskList from './TaskList';
import Task from './Task';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskLists: [
                new TaskList('BackLog', [
                    new Task('Add decorator support', 'This is needed to improve readability'),
                    new Task('Merge with some themeforest template', 'Default bootstrap theme is ugly')
                ]),
                new TaskList('Doing', [
                    new Task('Create backend', 'Try node, it\'s fast and light on server-side'),
                    new Task('Integrate OAuth', 'Users should use their Google/Whatever accounts')
                ]),
                new TaskList('Done', [
                    new Task('Create Git Repo', 'We need undo support for project')
                ])
            ]
        };
    }

    render() {
        return (
            <div className="App">
                <MenuBar/>
                <KanbanBoard taskLists={this.state.taskLists} />
            </div>
        );
    }
}

export default App;
