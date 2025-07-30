import React, { useEffect, useState } from "react";
import { api } from "./api";
import TaskForm from "../src/components/taskform";
import TaskList from "../src/components/tasklist";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (task) => {
    const res = await api.post("/tasks", task);
    setTasks([res.data, ...tasks]);
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const toggleTask = async (id, completed) => {
    const res = await api.put(`/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(task => task._id === id ? res.data : task));
  };

  const markAllAsDone = async () => {
    try {
      // Update all incomplete tasks in the backend
      const updates = await Promise.all(
        tasks.map(task =>
          !task.completed
            ? api.put(`/tasks/${task._id}`, { completed: true })
            : Promise.resolve({ data: task }) // already done
        )
      );

      // Update frontend state
      setTasks(updates.map(res => res.data));
    } catch (error) {
      console.error("Failed to mark all as done:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    // Test API connection
    console.log("Testing API connection...");
    api.get("/tasks")
      .then(response => {
        console.log("Connected to server successfully:", response.data);
      })
      .catch(error => {
        console.error("Server connection error:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-actions">
        <TaskForm onAdd={addTask} />
        <button 
          onClick={markAllAsDone}
          className="mark-all-done"
          disabled={tasks.every(task => task.completed)}
        >
          Mark All as Done
        </button>
      </div>
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
}

export default App;
