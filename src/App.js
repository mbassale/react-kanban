import React, {Component} from 'react';
import './App.css';
import MenuBar from './MenuBar';
import KanbanBoard from './KanbanBoard';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const kanban = {
            lists: [
                {
                    title: 'Backlog',
                    tasks: [
                        {
                            title: 'Support unlimited lists',
                            summary: 'Try to show more than 4 lists'
                        },
                        {
                            title: 'Google Accounts Integration',
                            summary: 'It\'s possible to use google accounts for board members?'
                        }
                    ]
                },
                {
                    title: 'Doing',
                    tasks: [
                        {
                            title: 'Test',
                            summary: 'Do something'
                        }
                    ]
                },
                {
                    title: 'Done',
                    tasks: [
                        {
                            title: 'Test',
                            summary: 'Do something'
                        }
                    ]
                }
            ]
        };

        return (
            <div className="App">
                <MenuBar/>
                <KanbanBoard kanban={kanban} />
            </div>
        );
    }
}

export default App;
