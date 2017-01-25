/**
 * Created by mbassale on 22-01-17.
 */
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import KanbanList from './KanbanList';
import {observer} from 'mobx-react';

const KanbanBoard = observer(
    class KanbanBoard extends Component {
        constructor(props) {
            super(props);
            this.state = {
                taskLists: props.taskLists
            };
        }

        render() {

            const lists = this.state.taskLists.map((item, index) => {
                return <KanbanList key={index} taskList={item} />
            });

            return (
                <Row>
                    <Col xs={2}/>
                    {lists}
                </Row>
            );
        }
    }
);

export default KanbanBoard;
