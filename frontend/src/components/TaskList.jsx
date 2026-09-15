import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  totalTasks,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <section className="card">
      <h2>Task List</h2>

      {totalTasks === 0 ? (
        <p className="empty-message">
          No tasks available.
        </p>
      ) : tasks.length === 0 ? (
        <p className="empty-message">
          No matching tasks found.
        </p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;