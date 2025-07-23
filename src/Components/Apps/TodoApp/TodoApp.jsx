import React, { useEffect, useState } from "react";
import PomodoroTimer from "./PomodoroTimer";
import TodoInputBar from "./TodoInputBar";
import TodoList from "./TodoList";
import "./TodoApp.css";

const LOCAL_STORAGE_KEY = "todo-tasks";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [reminderTime, setReminderTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Reminder check
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString();
      setTasks((prev) =>
        prev.map((task) =>
          task.reminder &&
            !task.completed &&
            !task.notified &&
            new Date(task.reminder) <= new Date(now)
            ? { ...task, notified: alert(`🔔 Reminder: ${task.title}`) || true }
            : task
        )
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Pomodoro Timer
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          setIsRunning(false);
          setTimeLeft(nextIsBreak ? 5 * 60 : 25 * 60);
          alert(nextIsBreak ? "🧘 Time for a short break!" : "⏱ Back to focus!");
          return nextIsBreak ? 5 * 60 : 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  // Handlers
  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const now = new Date().toISOString();
    setTasks([
      {
        id: Date.now(),
        title: newTask.trim(),
        description: description,
        createdAt: now,
        completed: false,
        completedAt: null,
        reminder: reminderTime ? new Date(reminderTime).toISOString() : null,
        notified: false,
      },
      ...tasks,
    ]);
    setNewTask("");
    setDescription("");
    setReminderTime("");
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null,
          }
          : task
      )
    );
  };

  // Pomodoro controls
  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  return (
    <div className="todo-app-layout">
      <div className="todo-app-left">
        <TodoInputBar
          newTask={newTask}
          reminderTime={reminderTime}
          onTaskChange={(e) => setNewTask(e.target.value)}
          onReminderChange={(e) => setReminderTime(e.target.value)}
          onAddTask={handleAddTask}
          options={{ description, setDescription }}
        />
        <TodoList tasks={tasks} onToggle={handleToggleTask} />
      </div>
      <div className="todo-app-right">
        <PomodoroTimer
          isBreak={isBreak}
          timeLeft={timeLeft}
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default TodoApp;
