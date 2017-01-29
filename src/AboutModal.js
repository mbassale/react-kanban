/**
 * Created by mbassale on 28-01-17.
 */
import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class AboutModal extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.close = this.close.bind(this);
    }

    close() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>This a Kanban Board Demo of React with Bootstrap Components</h4>
                    <p>Portfolio: <a href="https://www.mbassale.cl" target="_blank">https://www.mbassale.cl</a></p>
                    <p>GitHub account: <a href="https://github.com/mbassale" target="_blank">https://github.com/mbassale</a></p>
                    <p>&copy; 2017 Marco Bassaletti</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AboutModal;
