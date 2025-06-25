import React, { useState, useEffect } from 'react';
import '../App.css';

function ToDo() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todo-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    const task = updated[index];

    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;

    setTasks(updated);
  };

  const getDuration = (createdAt, completedAt) => {
    const start = new Date(createdAt);
    const end = new Date(completedAt);
    const diffMs = end - start;

    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className='app-container' style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h3>To-Do List</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          style={{ flex: 1 }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f9f9f9',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              <div>
                <div
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#888' : '#000',
                  }}
                >
                  {task.text}
                </div>
                <small style={{ color: '#666' }}>
                  Added: {new Date(task.createdAt).toLocaleString()}
                  {task.completedAt && (
                    <>
                      <br />
                      Completed: {new Date(task.completedAt).toLocaleString()}<br />
                      ⏱ Duration: {getDuration(task.createdAt, task.completedAt)}
                    </>
                  )}
                </small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
