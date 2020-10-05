import React from "react";

export class ToggleableTimerForm extends React.Component {
    state = {
        showForm: false
    }
    render() {
        if (this.state.showForm) {
            return (
                <TimerForm
                    onFormSubmit={ this.props.onCreateTimer }
                    onFormClose={ this.handleToggleShowForm }
                />
            );
        }
        return (
            <div className="ui basic content center aligned segment">
                <button
                    className="ui basic button icon"
                    onClick={ this.handleToggleShowForm }
                >
                    <i className="plus icon"/>
                </button>
            </div>
        );
    };
    handleToggleShowForm = () => {
        console.log("I got clicked")
        this.setState({  showForm: !this.state.showForm })
    }
}

export class TimerForm extends React.Component {
    state = {
        id: this.props.id || "",
        title: this.props.title || "",
        description: this.props.description || "",
    };
    render() {
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input
                                type="text"
                                value={this.state.title}
                                onChange={(e) => this.setState({ title: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>description</label>
                            <input
                                type="text"
                                value={this.state.description}
                                onChange={(e) => this.setState({ description: e.target.value })}
                            />
                        </div>
                        <div className="ui two bottom attached buttons">
                            <button
                                className="ui basic blue button"
                                onClick={ () => 
                                    {
                                        this.props.onFormSubmit(this.state)
                                        this.props.onFormClose()
                                    }
                                }
                            >
                                {this.props.id ? "Update" : "Create"}
                            </button>
                            <button
                                className="ui basic red button"
                                onClick={ () => this.props.onFormClose() }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}