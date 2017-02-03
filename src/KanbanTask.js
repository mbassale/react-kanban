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

        oldIndex = null;
        oldTitle = null;
        oldSummary = null;
        oldDescription = null;

        constructor(props) {
            super(props);
            this.state = {
                editMode: false
            };
            this.oldIndex = props.task.index;
            this.oldTitle = props.task.title;
            this.oldSummary = props.task.summary;
            this.oldDescription = props.task.description;
            this.handleEdit = this.handleEdit.bind(this);
            this.handleSave = this.handleSave.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
            this.handleDelete = this.handleDelete.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleDoubleClick = this.handleDoubleClick.bind(this);
        }

        handleEdit() {
            this.setState({
                editMode: true
            });
        }

        handleSave() {
            this.props.taskList.sortTasks(this.props.task);
            this.setState({
                editMode: false
            });
        }

        handleCancel() {
            this.props.task.index = this.oldIndex;
            this.props.task.title = this.oldTitle;
            this.props.task.summary = this.oldSummary;
            this.props.task.description = this.oldDescription;
            this.setState({
                editMode: false
            });
        }

        handleDelete() {
            this.setState({
                editMode: false
            });
            if (this.props.onDelete) {
                this.props.onDelete(this.props.task);
            }
        }

        handleChange(e) {
            switch(e.target.name) {
                case 'index':
                    this.props.task.index = e.target.value;
                    break;
                case 'title':
                    this.props.task.title = e.target.value;
                    break;
                case 'summary':
                    this.props.task.summary = e.target.value;
                    break;
                case 'description':
                    this.props.task.description = e.target.value;
                    break;
            }
        }

        handleDoubleClick(e) {
            this.setState({
                editMode: true
            });
        }

        render() {
            const task = this.props.task;

            let panelTitle = null;
            if (this.state.editMode) {
                panelTitle = (
                    <div className="pull-left">
                        <FormControl name="title" placeholder={task.title} className="form-control input-sm taskTitleEditor"
                                     value={task.title}
                                     onChange={this.handleChange} />
                    </div>
                );
            } else {
                const title = lodash.truncate(task.title, {'length': 24});
                panelTitle = (
                    <span onDoubleClick={this.handleDoubleClick}>{title}</span>
                );
            }

            let panelOptions = null;
            if (this.state.editMode) {
                let selectIndexOptions = lodash.range(this.props.taskList.tasks.length).map((index) => {
                    return (<option key={index} value={index}>{index+1}</option>)
                });
                panelOptions = (
                    <div className="pull-right">
                        <select className="form-control select-index" name="index" value={task.index} onChange={this.handleChange}>
                            {selectIndexOptions}
                        </select>
                        <Button className="btn btn-primary btn-xs" onClick={this.handleSave}>Save</Button>
                        <Button className="btn btn-default btn-xs" onClick={this.handleCancel}>Cancel</Button>
                        <Button className="btn btn-danger btn-xs" onClick={this.handleDelete}>Delete</Button>
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
                            <FormControl name="summary" componentClass="textarea" placeholder={task.summary}
                                         value={task.summary}
                                         onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl name="description" componentClass="textarea" placeholder={task.description}
                                         value={task.description}
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
                                {task.summary}
                            </FormControl.Static>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl.Static onDoubleClick={this.handleDoubleClick}>
                                {task.description}
                            </FormControl.Static>
                        </FormGroup>
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
