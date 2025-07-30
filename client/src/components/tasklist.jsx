import React from "react";
import TaskItem from "../components/taskitem";

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
