import React from "react";
import { TimerForm } from "./timerForm.jsx"

export default class EditableTimer extends React.Component {
    state = {
        showForm: false,
    };
    render() {
        if (this.state.showForm) {
            return (
                <TimerForm
                    id={ this.props.id }
                    title={ this.props.title }
                    description={ this.props.description }
                    onFormSubmit={ this.props.onUpdateTimer }
                    onFormClose={ this.toggleShowForm }
                />
            )
        } else {
            return (
                <Timer
                    key={ this.props.id }
                    id={ this.props.id }
                    title={ this.props.title }
                    description={ this.props.description }
                    elapsed={ this.props.elapsed }
                    running={ this.props.running }
                    runningSince={this.props.runningSince}
                    onUpdateClick={ this.toggleShowForm }
                    onDeleteClick={ this.props.onDeleteTimer }
                    onStartClick={ this.props.onStartTimer }
                    onPauseClick={ this.props.onPauseTimer }
                    onResetClick={ this.props.onResetTimer }
                />
            )
        }
    };
    toggleShowForm = () =>  {
        this.setState({ showForm: !this.state.showForm})
    };
}

class Timer extends React.Component {
    state = {
        started: false,
        interval: null,
        elapsedString: "00:00:00"
    };
    render() {
        var beforeStart = (
            <div
            className="ui bottom attached blue basic button"
            onClick={ this.handleToggleStartTimer }
            >
                Start
            </div>
        )
        var afterStart = (
            <div className="ui two bottom attached buttons">
                <button
                    className="ui basic blue button"
                    onClick={ this.handleToggleStartTimer }
                >
                    { this.props.running ? "Pause" : "Start" }
                </button>
                <button
                    className="ui basic red button"
                    onClick={ this.handleResetTimer }
                >
                    Reset
                </button>
            </div>
        );
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="center aligned header">
                        {this.props.title}
                    </div>
                    <div className="meta">
                        {this.props.description}
                    </div>
                    <div className="center aligned description">
                        <h2>
                            { this.state.elapsedString }
                        </h2>
                    </div>
                    <div className="extra content">
                        <span
                            className="right floated edit icon"
                        >
                            <i className="edit icon" onClick={ this.props.onUpdateClick }/>
                        </span>
                        <span 
                            className="right floated trash icon"
                        >
                          <i className="trash icon" onClick={ (e) => { this.props.onDeleteClick(this.props.id) } }/>
                        </span>
                    </div>
                </div>
                { this.state.started ? afterStart : beforeStart}
            </div>
        );
    };
    componentDidUpdate() {
        console.log("interval after: " + this.state.interval)
        if (this.props.running && !this.state.interval) {
            console.log("Setting interval for timer with id: " + this.props.id);
            var interval = setInterval(
                () => {
                    if (this.props.running) {
                        this.setState({ elapsedString: this.renderElapsedString() });
                    }
                },
                1000
            );
            this.setState({interval: interval});
        }
    };
    componentWillUnmount() {
        if (this.state.interval) {
            console.log("Clearing interval for timer with id: " + this.props.id);
            clearInterval(this.interval);
        }
    };
    handleToggleStartTimer = () => {
        if (this.props.running) {
            this.handlePauseTimer()
        } else {
            this.handleStartTimer()
        }
    };
    handlePauseTimer = () => {
        console.log("interval before: " + this.state.interval);
        this.props.onPauseClick(
            {
                id: this.props.id,
                elapsedDelta: Date.now() - this.props.runningSince
            }
        );
        console.log("Clearing interval for timer with id: " + this.props.id);
        clearInterval(this.state.interval);
        this.setState(
            { 
                interval: null,
                elapsedDelta: 0
            }
        );
    };
    handleStartTimer = () => {
        this.props.onStartClick({ id: this.props.id });
        this.setState({ started: true })
    };
    handleResetTimer = () => {
        if ( this.props.running ) {
            clearInterval(this.state.interval);
        }
        this.props.onResetClick({ id: this.props.id });
        this.setState(
            { 
                started: false,
                interval: null,
                elapsedString: "00:00:00"
            }
        );
    };
    renderElapsedString = () => {
        var ms = this.props.running ? Date.now() - this.props.runningSince + this.props.elapsed : this.props.elapsed;

        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);

        return [
            this.pad(hours.toString(), 2),
            this.pad(minutes.toString(), 2),
            this.pad(seconds.toString(), 2)
        ].join(":");
    };
    pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) {
            padded = `0${padded}`
        };
        return padded;
    };
}