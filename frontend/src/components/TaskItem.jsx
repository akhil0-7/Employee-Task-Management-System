function TaskItem({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const today = new Date().toISOString().split("T")[0];

  const isOverdue =
    task.dueDate < today && task.status !== "Completed";

  return (
    <div className="task-item">

      <div className="task-info">

        <h3>{task.title}</h3>

        <p>
          <strong>Employee:</strong> {task.employee}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </p>

        <p>
          <strong>Due Date:</strong> {task.dueDate}
        </p>

        {isOverdue && (
          <p className="overdue">
            ⚠ Overdue
          </p>
        )}

      </div>

      <div className="task-controls">

        <label htmlFor={`status-${task.id}`}>
          Status
        </label>

        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value)
          }
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="task-actions">

          <button
            type="button"
            className="edit-button"
            onClick={() => onEdit(task.id)}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default TaskItem;