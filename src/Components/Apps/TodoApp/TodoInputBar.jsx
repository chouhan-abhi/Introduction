import React from "react";
import { ICONS } from "../../../Utils/constants";

const TodoInputBar = ({ newTask, reminderTime, onTaskChange, onReminderChange, onAddTask, options }) => {
    const [showOptions, setShowOptions] = React.useState(false);
    const { description, setDescription } = options || {};
    return (
        <div className="todo-input-bar-container">
            <div className="todo-input-bar title-container">
                <input type="text" placeholder="What's on your mind?" value={newTask} onChange={onTaskChange} />
                <button className="passive-button" onClick={() => setShowOptions(!showOptions)}>
                    ---
                </button>
                <button onClick={onAddTask}>
                    <img src={ICONS.CREATE} alt="Add Task" />
                </button>
            </div>
            { showOptions ? <div className="todo-input-bar more-options">
                <textarea type="text" placeholder="Describe your thoughts..." value={description} onChange={e => setDescription(e.target.value)} />
                <input type="datetime-local" value={reminderTime} onChange={onReminderChange} style={{ marginLeft: 8 }} />
            </div> : null }
        </div>
    );
}

export default TodoInputBar;
