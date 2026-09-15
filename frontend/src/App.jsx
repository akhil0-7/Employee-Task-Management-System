import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskSummary from "./components/TaskSummary";
import TaskList from "./components/TaskList";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Fix Login Bug",
    employee: "Rahul",
    priority: "High",
    dueDate: "2026-09-10",
    status: "Pending",
  },
  {
    id: 2,
    title: "Bug Re-Test",
    employee: "Anu",
    priority: "Medium",
    dueDate: "2026-09-12",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Fix Authorization Bug",
    employee: "Arjun",
    priority: "High",
    dueDate: "2026-09-15",
    status: "Completed",
  },
  {
    id: 4,
    title: "Test Login Page",
    employee: "Fathima",
    priority: "Low",
    dueDate: "2026-09-18",
    status: "Pending",
  },
  {
    id: 5,
    title: "Test UI",
    employee: "Rahul",
    priority: "Medium",
    dueDate: "2026-09-20",
    status: "In Progress",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    employee: "All",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        ...newTask,
        id: Date.now(),
        status: "Pending",
      },
    ]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTaskId(null);
  };

  const handleDelete = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );

    if (editingTaskId === taskId) {
      setEditingTaskId(null);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "All" ||
      task.status === filters.status;

    const matchesPriority =
      filters.priority === "All" ||
      task.priority === filters.priority;

    const matchesEmployee =
      filters.employee === "All" ||
      task.employee === filters.employee;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesEmployee
    );
  });

  const handleClearFilters = () => {
    setSearchTerm("");

    setFilters({
      status: "All",
      priority: "All",
      employee: "All",
    });
  };

  const editingTask = tasks.find(
    (task) => task.id === editingTaskId
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Task Management System</h1>
        <p>Manage employee tasks efficiently</p>
      </header>

      <main className="container">

        <TaskForm
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTaskId(null)}
        />

        <TaskSummary tasks={tasks} />

        <TaskFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          onClearFilters={handleClearFilters}
        />

        <TaskList
          tasks={filteredTasks}
          totalTasks={tasks.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

      </main>
    </div>
  );
}

export default App;