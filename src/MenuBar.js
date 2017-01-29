/**
 * Created by mbassale on 22-01-17.
 */
import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import MenuItemKey from './MenuItemKey'

class MenuBar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(eventKey) {
        if (this.props.onMenuItemSelected) {
            this.props.onMenuItemSelected(eventKey)
        }
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">React Kanban</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1}>Add List</NavItem>
                    <NavItem eventKey={2}>Search</NavItem>
                </Nav>
                <Nav pullRight={true}>
                    <NavItem eventKey={MenuItemKey.ABOUT} onSelect={this.handleSelect}>About...</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default MenuBar;
