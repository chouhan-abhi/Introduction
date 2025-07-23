import React from "react";
import { formatDateTime, formatDuration } from "./utils";

const TodoItem = ({ task, onToggle }) => (
  <li className={`todo-item ${task.completed ? "done" : ""}`}>
      <label>
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      </label>
    <div className="todo-content">
      <div className="todo-texts">
        <span className={`todo-title${task.completed ? " strike" : ""}`}>{task.title}</span>
        {task.description && <span className="todo-desc">{task.description}</span>}
        <span className="todo-date">{formatDateTime(task.createdAt)}</span>
      </div>
      <div className="todo-meta-right">
        {task.reminder && (
          <span className="todo-reminder">🔔 {formatDateTime(task.reminder)}</span>
        )}
        {/* {task.completed && (
          <span className="todo-completed-tag">
            {formatDuration(task.createdAt, task.completedAt)}
          </span>
        )} */}
      </div>
    </div>
  </li>
);

export default TodoItem;
  