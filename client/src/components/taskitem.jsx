import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, task.completed)}
      />
      <span>{task.title}</span>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
