import React from "react";
import EditableTimer from "./timer.jsx"

export default class TimerList extends React.Component {
    render() {
        return (
            <div className="timers">
                {
                    this.props.timers.map(
                        timer => (
                            <EditableTimer
                                key={ timer.id + "-editable" }
                                id={ timer.id }
                                title={ timer.title }
                                description={ timer.description }
                                elapsed={ timer.elapsed }
                                running={ timer.running }
                                runningSince={ timer.runningSince }
                                onUpdateTimer={ this.props.onUpdateTimer }
                                onDeleteTimer={ this.props.onDeleteTimer }
                                onStartTimer={ this.props.onStartTimer }
                                onPauseTimer={ this.props.onPauseTimer }
                                onResetTimer={ this.props.onResetTimer }
                            />
                        )
                    )
                }
            </div>
        );
    };
}