/**
 * Created by mbassale on 22-01-17.
 */
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import KanbanTask from './KanbanTask';

class KanbanList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            tasks: props.tasks
        };
    }

    render() {

        const taskList = this.state.tasks.map((task, index) => {
                return <KanbanTask title={task.title} summary={task.summary}/>;
            });

        return (
            <Col xs={6} md={2}>
                <Row>
                    <h4 className="text-center">{this.state.title}</h4>
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

export default KanbanList;
