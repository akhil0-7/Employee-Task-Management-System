function TaskSummary({ tasks }) {
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const employees = ["Rahul", "Anu", "Arjun", "Fathima"];

  return (
    <section className="card">
      <h2>Task Summary</h2>

      <div className="summary-grid">
        <div className="summary-item">
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="summary-item">
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
        </div>

        <div className="summary-item">
          <span>In Progress</span>
          <strong>{inProgressTasks}</strong>
        </div>

        <div className="summary-item">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>
      </div>

      <h3>Tasks by Employee</h3>

      <div className="employee-summary">
        {employees.map((employee) => {
          const count = tasks.filter(
            (task) => task.employee === employee
          ).length;

          return (
            <div key={employee}>
              {employee}: {count}{" "}
              {count === 1 ? "Task" : "Tasks"}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TaskSummary;