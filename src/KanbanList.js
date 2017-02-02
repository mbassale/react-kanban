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
            this.state = {
                taskList: props.taskList
            };
            this.handleNewTask = this.handleNewTask.bind(this);
        }

        handleNewTask() {
            this.state.taskList.newTask();
        }

        render() {

            const taskList = this.state.taskList.tasks.map((task, index) => {
                return <KanbanTask key={index} task={task} />;
            });
            const title = lodash.truncate(this.state.taskList.title, {'length': 16});

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
