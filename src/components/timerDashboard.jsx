import React from "react";
import TimerList from "./timerList.jsx"
import { ToggleableTimerForm } from "./timerForm"
import { v4 } from "../../node_modules/uuid"

export default class TimersDashboard extends React.Component {
    state = {
        timers: [
            {
                title: "Timer-0",
                description: "Description-0",
                id: "4a5c8f67-fc34-44fb-963e-cb54040b111a",
                elapsed: 0,
                running: false,
                runningSince: null,
            }, 
            {
                title: "Timer-1",
                description: "Description-1",
                id: "4b68ce06-0e90-4601-ae45-549b6d38fe25",
                elapsed: 0,
                running: false,
                runningSince: null,
            }
        ]
    };
    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <TimerList
                        timers={ this.state.timers }
                        onUpdateTimer={ this.handleUpdateTimer }
                        onDeleteTimer={ this.handleDeleteTimer }
                        onStartTimer={ this.handleStartTimer }
                        onPauseTimer={ this.handlePauseTimer }
                        onResetTimer={ this.handleResetTimer }
                    />
                    <ToggleableTimerForm
                        onCreateTimer={ this.handleCreateTimer }
                    />
                </div>
            </div>
        );
    };
    handleCreateTimer = (e) => {
        console.log("Create timer called for new timer titled: " + e.title)
        const t = {
            title: e.title || 'Timer',
            description: e.description || 'description',
            id: v4(), // eslint-disable-line no-undef
            elapsed: 0,
        };
        this.setState(
            {
                timers: this.state.timers.concat(t),
            }
        );
    };
    handleUpdateTimer = (e) => {
        var newTimers = [...this.state.timers];
        var timerFound = false;
        for (let i=0; i<newTimers.length; i++) {
            if (newTimers[i].id === e.id) {
                newTimers[i].description = e.description;
                newTimers[i].title = e.title;
                timerFound = true;
                break;
            }
        }
        if (!timerFound) {
            console.log("Attempted edit of timer with id: " + e.id + " failed because the timer was not found");
        }
        this.setState({ timers: newTimers });
    };
    handleDeleteTimer = (e) => {
        console.log("Delete timer called for Timer with id: " + e)
        var newTimers = this.state.timers.filter(timer => timer.id !== e)
        console.log(newTimers)
        this.setState(
            {
                timers: this.state.timers.filter(timer => timer.id !== e)
            }
        )
    };
    handleStartTimer = (e) => {
        var newTimers = [...this.state.timers];
        var timerFound = false;
        for (let i=0; i<newTimers.length; i++) {
            if (newTimers[i].id === e.id) {
                newTimers[i].running = true;
                newTimers[i].runningSince = Date.now();
                timerFound = true;
                break;
            }
        }
        if (!timerFound) {
            console.log("Attempted start of timer with id: " + e.id + " failed because the timer was not found");
        }
        this.setState({ timers: newTimers });
    };
    handlePauseTimer = (e) => {
        var newTimers = [...this.state.timers];
        var timerFound = false;
        for (let i=0; i<newTimers.length; i++) {
            if (newTimers[i].id === e.id) {
                newTimers[i].running = false;
                newTimers[i].runningSince = null;
                newTimers[i].elapsed += e.elapsedDelta;
                timerFound = true;
                break;
            }
        }
        if (!timerFound) {
            console.log("Attempted pause of timer with id: " + e.id + " failed because the timer was not found");
        }
        this.setState({ timers: newTimers });
    };
    handleResetTimer = (e) => {
        var newTimers = [...this.state.timers];
        var timerFound = false;
        for (let i=0; i<newTimers.length; i++) {
            if (newTimers[i].id === e.id) {
                newTimers[i].running = false;
                newTimers[i].runningSince = null;
                newTimers[i].elapsed = 0;
                timerFound = true;
                break;
            }
        }
        if (!timerFound) {
            console.log("Attempted reset of timer with id: " + e.id + " failed because the timer was not found");
        }
        this.setState({ timers: newTimers });
    };
}