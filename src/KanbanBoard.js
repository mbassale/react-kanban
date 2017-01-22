/**
 * Created by mbassale on 22-01-17.
 */
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import KanbanList from './KanbanList';

class KanbanBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kanban: props.kanban
        };
    }

    render() {

        const lists = this.state.kanban.lists.map((item, index) => {
            return <KanbanList key={index} title={item.title} tasks={item.tasks} />
        });

        return (
            <Row>
                <Col xs={2}></Col>
                {lists}
            </Row>
        );
    }
}

export default KanbanBoard;
