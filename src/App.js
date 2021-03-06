import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './App.css';
import MenuBar from './MenuBar';
import KanbanBoard from './KanbanBoard';
import TaskList from './TaskList';
import Task from './Task';
import AboutModal from './AboutModal';
import MenuItemKey from './MenuItemKey';

const App = observer(
    class App extends Component {

        taskLists = [
            new TaskList('BackLog', [
                new Task(0, 'Add decorator support', 'This is needed to improve readability'),
                new Task(1, 'Merge with some themeforest template', 'Default bootstrap theme is ugly')
            ]),
            new TaskList('Doing', [
                new Task(0, 'Create backend', 'Try node, it\'s fast and light on server-side'),
                new Task(1, 'Integrate OAuth', 'Users should use their Google/Whatever accounts')
            ]),
            new TaskList('Done', [
                new Task(0, 'Create Git Repo', 'We need undo support for project')
            ])
        ];

        constructor(props) {
            super(props);
            this.state = {
                showAboutModal: false,
            };
            this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this);
            this.closeAboutModal = this.closeAboutModal.bind(this);
        }

        handleMenuItemSelected(menuItemKey) {
            switch (menuItemKey) {
                case MenuItemKey.ABOUT:
                    this.setState({showAboutModal: true});
                    break;
            }
        }

        closeAboutModal() {
            this.setState({
                showAboutModal: false
            });
        }

        render() {
            return (
                <div className="App">
                    <MenuBar onMenuItemSelected={this.handleMenuItemSelected}/>
                    <KanbanBoard taskLists={this.taskLists}/>
                    <AboutModal show={this.state.showAboutModal} onClose={this.closeAboutModal}/>
                </div>
            );
        }
    }
);

export default App;
