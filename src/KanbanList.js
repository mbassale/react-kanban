/**
 * Created by mbassale on 22-01-17.
 */
import React, {Component} from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import KanbanTask from './KanbanTask';
import {observer} from 'mobx-react';
import * as lodash from 'lodash';

const KanbanList = observer(
    class KanbanList extends Component {

        constructor(props) {
            super(props);
            this.state = {};
            this.handleNewTask = this.handleNewTask.bind(this);
            this.handleDeleteTask = this.handleDeleteTask.bind(this);
        }

        handleNewTask() {
            this.props.taskList.newTask();
        }

        handleDeleteTask(task) {
            this.props.taskList.deleteTask(task);
        }

        render() {
            const taskList = this.props.taskList.tasks.map((task, index) => {
                return <KanbanTask key={index} taskList={this.props.taskList} task={task} onDelete={this.handleDeleteTask} />;
            });
            const title = lodash.truncate(this.props.taskList.title, {'length': 16});

            return (
                <Col xs={6} md={2}>
                    <Row>
                        <h4 className="text-center">{title}&nbsp;
                            <Button className="btn btn-primary btn-xs" onClick={this.handleNewTask}>New Task</Button>
                        </h4>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {taskList}
                        </Col>
                    </Row>
                </Col>
            );
        }
    }
);

export default KanbanList;
