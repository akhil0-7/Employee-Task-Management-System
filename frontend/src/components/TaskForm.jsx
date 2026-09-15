import { useState } from "react";

const emptyForm = {
  title: "",
  employee: "",
  priority: "",
  dueDate: "",
};

function TaskForm({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(
    editingTask
      ? {
          title: editingTask.title,
          employee: editingTask.employee,
          priority: editingTask.priority,
          dueDate: editingTask.dueDate,
        }
      : emptyForm
  );

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required.";
    }

    if (!formData.employee) {
      newErrors.employee = "Employee is required.";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        ...formData,
      });
    } else {
      onAddTask(formData);
    }

    setFormData(emptyForm);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    onCancelEdit();
  };

  return (
    <section className="card form-card">
      <h2>
        {editingTask ? "Edit Task" : "Create New Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />

          {errors.title && (
            <p className="error">{errors.title}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="employee">Employee</label>

          <select
            id="employee"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
          >
            <option value="">Select Employee</option>
            <option value="Rahul">Rahul</option>
            <option value="Anu">Anu</option>
            <option value="Arjun">Arjun</option>
            <option value="Fathima">Fathima</option>
          </select>

          {errors.employee && (
            <p className="error">{errors.employee}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {errors.priority && (
            <p className="error">{errors.priority}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>

          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />

          {errors.dueDate && (
            <p className="error">{errors.dueDate}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {editingTask ? "Update Task" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TaskForm;