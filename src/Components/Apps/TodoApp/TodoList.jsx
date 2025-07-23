import React from "react";
import TodoItem from "./TodoItem";
import { groupTasksByDay } from "./utils";

const TodoList = ({ tasks, onToggle }) => {
  const grouped = groupTasksByDay(tasks);

  return (
    <div className="timeline-container">
      {Object.entries(grouped).map(([day, dayTasks], idx, arr) => (
        <div key={day} className="timeline-day">
          <div className="timeline-header">
            <div className="timeline-date">{day}</div>
          </div>

          <div className="timeline-pipe">
            <ul className="timeline-tasks">
              {dayTasks
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((task) => (
                  <li className="timeline-node" key={task.id}>
                    <div className="timeline-content">
                    <div className={`timeline-dot ${task.completed ? "completed-dot" : ""}`} />
                      <TodoItem task={task} onToggle={onToggle} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {idx < arr.length - 1 && <div className="timeline-separator" />}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
