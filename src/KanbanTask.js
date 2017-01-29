/**
 * Created by mbassale on 22-01-17.
 */
import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Panel, Row, Col} from 'react-bootstrap';
import {observer} from 'mobx-react';
import * as lodash from 'lodash';
import './KanbanTask.css';

const KanbanTask = observer(
    class KanbanTask extends Component {

        task = null;

        constructor(props) {
            super(props);
            this.task = props.task;
            this.state = {
                editMode: false,
                editTitle: props.task.title,
                editSummary: props.task.summary,
                editDescription: props.task.description
            };
            this.editTitle = lodash.clone(props.task.title);
            this.editSummary = lodash.clone(props.task.summary);
            this.editDescription = lodash.clone(props.task.description);
            this.handleEdit = this.handleEdit.bind(this);
            this.handleSave = this.handleSave.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleDoubleClick = this.handleDoubleClick.bind(this);
        }

        handleEdit() {
            this.setState({
                editMode: true
            });
        }

        handleSave() {
            this.task.title = this.state.editTitle;
            this.task.summary = this.state.editSummary;
            this.task.description = this.state.editDescription;
            this.setState({
                editMode: false
            });
        }

        handleCancel() {
            this.setState({
                editTitle: this.task.title,
                editSummary: this.task.summary,
                editDescription: this.task.description,
                editMode: false
            });
        }

        handleChange(e) {
            let newState = null;
            switch(e.target.name) {
                case 'title':
                    newState = {
                        editTitle: e.target.value
                    };
                    break;
                case 'summary':
                    newState = {
                        editSummary: e.target.value
                    };
                    break;
                case 'description':
                    newState = {
                        editDescription: e.target.value
                    };
                    break;
            }
            if (newState) {
                this.setState(newState);
            }
        }

        handleDoubleClick(e) {
            this.setState({
                editMode: true
            });
        }

        render() {
            const title = lodash.truncate(this.state.editTitle, {'length': 24});

            let panelTitle = null;
            if (this.state.editMode) {
                panelTitle = (
                    <div className="pull-left">
                        <FormControl name="title" placeholder={this.state.editTitle} className="form-control input-sm taskTitleEditor"
                                     value={this.state.editTitle}
                                     onChange={this.handleChange} />
                    </div>
                );
            } else {
                panelTitle = (
                    <span onDoubleClick={this.handleDoubleClick}>{title}</span>
                );
            }

            let panelOptions = null;
            if (this.state.editMode) {
                panelOptions = (
                    <div className="pull-right">
                        <Button className="btn btn-primary btn-xs" onClick={this.handleSave}>Save</Button>
                        <Button className="btn btn-default btn-xs" onClick={this.handleCancel}>Cancel</Button>
                    </div>
                );
            } else {
                panelOptions = (
                    <div className="pull-right">
                        <Button className="btn btn-primary btn-xs" onClick={this.handleEdit}>Edit</Button>
                    </div>
                );
            }


            const panelHeader = (
                <div>
                    {panelTitle}
                    {panelOptions}
                </div>
            );

            let panelBody = null;
            if (this.state.editMode) {
                panelBody = (
                    <form>
                        <FormGroup>
                            <ControlLabel>Summary</ControlLabel>
                            <FormControl name="summary" componentClass="textarea" placeholder="Summary..."
                                         value={this.state.editSummary}
                                         onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl name="description" componentClass="textarea" placeholder="Description..."
                                         value={this.state.editDescription ? this.state.editDescription : ''}
                                         onChange={this.handleChange} />
                        </FormGroup>
                    </form>
                );
            } else {
                panelBody = (
                    <form>
                        <FormGroup>
                            <ControlLabel>Summary</ControlLabel>
                            <FormControl.Static onDoubleClick={this.handleDoubleClick}>
                                {this.state.editSummary}
                            </FormControl.Static>
                        </FormGroup>
                        {
                            this.state.editDescription &&
                            <FormGroup>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl.Static onDoubleClick={this.handleDoubleClick}>
                                    {this.state.editDescription}
                                </FormControl.Static>
                            </FormGroup>
                        }
                    </form>
                );
            }

            return (
                <Panel header={panelHeader}>
                    {panelBody}
                </Panel>
            );
        }
    }
);

export default KanbanTask;
