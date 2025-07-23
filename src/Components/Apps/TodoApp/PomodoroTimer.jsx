import React, { useState, useEffect } from "react";
import { formatTime } from "./utils";

const PomodoroTimer = ({ isBreak, timeLeft, isRunning, onStart, onPause, onReset }) => {
    const [sessionHistory, setSessionHistory] = useState([]);

    // Function to log completed Pomodoro sessions
    const logSession = (sessionType, duration) => {
        const formattedDuration = formatTime(duration);
        setSessionHistory((prevHistory) => [
            ...prevHistory,
            { type: sessionType, duration: formattedDuration, time: new Date().toLocaleString() },
        ]);
    };

    const handleSessionBreak = () => {
        if (isRunning) {
            onPause();
            logSession(isBreak ? "Break" : "Focus", isBreak ? 5 * 60 : 25 * 60);
        }
        onReset();
    };

    useEffect(() => {
        if (!isRunning) {
            const sessionType = isBreak ? "Break" : "Focus";
            logSession(sessionType, isBreak ? 5 * 60 : 25 * 60);
        }
    }, [isRunning, timeLeft, isBreak]);

    return (
        <div className="pomodoro">
            <h3>{isBreak ? "Break Time" : "Focus Time"}</h3>
            <div className="timer">{formatTime(timeLeft)}</div>
            <div className="timer-controls">
                <button onClick={onStart} disabled={isRunning}>▶ Start</button>
                <button onClick={handleSessionBreak} disabled={!isRunning}>⏸ Pause</button>
                <button onClick={handleSessionBreak}>0 Reset</button>
            </div>

            {sessionHistory ?
                <div className="session-history">
                    <h4>Past Sessions</h4>
                    <ul className="session-list">
                        {sessionHistory.map((session, index) => (
                            <li key={index}>
                                <strong>{session.type}</strong>: {session.duration} | <em>{session.time}</em>
                            </li>
                        ))}
                    </ul>
                </div> : null}
        </div>
    );
};

export default PomodoroTimer;
