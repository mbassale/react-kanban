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

        editTitle = '';
        editSummary = '';
        editDescription = '';

        constructor(props) {
            super(props);
            this.state = {
                editMode: false,
                task: props.task
            };
            this.handleEdit = this.handleEdit.bind(this);
            this.handleSave = this.handleSave.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
            this.handleTitleChange = this.handleTitleChange.bind(this);
            this.handleSummaryChange = this.handleSummaryChange.bind(this);
            this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        }

        handleEdit() {
            this.setState({
                editMode: true
            });
        }

        handleSave() {
            this.state.task.title = this.editTitle;
            this.state.task.summary = this.editSummary;
            this.state.task.description = this.editDescription;
            this.setState({
                editMode: false
            });
        }

        handleCancel() {
            this.editTitle = '';
            this.editSummary = '';
            this.editDescription = '';
            this.setState({
                editMode: false
            });
        }

        handleTitleChange(e) {
            this.editTitle = e.target.value;
        }

        handleSummaryChange(e) {
            this.editSummary = e.target.value;
        }

        handleDescriptionChange(e) {
            this.editDescription = e.target.value;
        }

        render() {
            const title = lodash.truncate(this.state.task.title, {'length': 24});

            let panelTitle = null;
            if (this.state.editMode) {
                panelTitle = (
                    <div className="pull-left">
                        <FormControl placeholder={title} className="form-control input-sm taskTitleEditor" onChange={this.handleTitleChange} />
                    </div>
                );
            } else {
                panelTitle = title;
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
                            <FormControl componentClass="textarea" placeholder="Summary..." onChange={this.handleSummaryChange} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Description..." onChange={this.handleDescriptionChange} />
                        </FormGroup>
                    </form>
                );
            } else {
                panelBody = (
                    <form>
                        <FormGroup>
                            <ControlLabel>Summary</ControlLabel>
                            <FormControl.Static>
                                {this.state.task.summary}
                            </FormControl.Static>
                        </FormGroup>
                        {
                            this.state.task.description &&
                            <FormGroup>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl.Static>
                                    {this.state.task.description}
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
