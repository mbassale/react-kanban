/**
 * Created by mbassale on 22-01-17.
 */
import React, {Component} from 'react';
import {Panel, Row, Col} from 'react-bootstrap';

class KanbanTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            summary: props.summary
        };
    }

    render() {
        return (
            <Panel header={this.state.title}>
                <Row>
                    <Col xs={12}>
                        <p>{this.state.summary}</p>
                    </Col>
                </Row>
            </Panel>
        );
    }
}

export default KanbanTask;
