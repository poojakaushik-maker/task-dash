
import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Add Task
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Edit Task
  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    }
  };

  // Update Task Status
  const updateStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Open Add Task Form
  const openAddForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // Open Edit Task Form
  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Close Form
  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Task Counts
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

  // Search and Sidebar Filtering
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesMenu =
      activeMenu === "Dashboard" || activeMenu === "My Tasks"
        ? true
        : activeMenu === "In Progress"
        ? task.status === "In Progress"
        : activeMenu === "Completed"
        ? task.status === "Completed"
        : true;

    return matchesSearch && matchesMenu;
  });

  return (
    <div className={`dashboard ${isDarkMode ? "dark-mode" : ""}`}>

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>TaskFlow</h2>

        <nav className="sidebar-menu">

          <a
            href="#"
            className={activeMenu === "Dashboard" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("Dashboard");
            }}
          >
            <span>Dashboard</span>
            <span className="menu-count">{totalTasks}</span>
          </a>

          <a
            href="#"
            className={activeMenu === "My Tasks" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("My Tasks");
            }}
          >
            <span>My Tasks</span>
            <span className="menu-count">{totalTasks}</span>
          </a>

          <a
            href="#"
            className={activeMenu === "In Progress" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("In Progress");
            }}
          >
            <span>In Progress</span>
            <span className="menu-count">{inProgressTasks}</span>
          </a>

          <a
            href="#"
            className={activeMenu === "Completed" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("Completed");
            }}
          >
            <span>Completed</span>
            <span className="menu-count">{completedTasks}</span>
          </a>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="header">

          <div>
            <h2>{activeMenu}</h2>
            <p>Welcome back! Manage your tasks here.</p>
          </div>

          <div className="header-actions">

            {/* Dark Mode */}
          <button
  className="dark-mode-btn"
  type="button"
  onClick={() => setIsDarkMode(!isDarkMode)}
  title={isDarkMode ? "Light Mode" : "Dark Mode"}
>
  {isDarkMode ? (
    <i className="bi bi-sun"></i>
  ) : (
    <i className="bi bi-moon-stars"></i>
  )}
</button>

            {/* Search Bar */}
            <div className="navbar-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add New Task */}
            <button
              type="button"
              className="add-btn"
              onClick={openAddForm}
            >
              + Add New Task
            </button>

          </div>
        </header>

        {/* Summary Cards */}
        <section className="summary">

          <div className="summary-card">
            <p>Total Tasks</p>
            <h2>{totalTasks}</h2>
          </div>

          <div className="summary-card">
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
          </div>

          <div className="summary-card">
            <p>In Progress</p>
            <h2>{inProgressTasks}</h2>
          </div>

          <div className="summary-card">
            <p>Completed</p>
            <h2>{completedTasks}</h2>
          </div>

        </section>

        {/* Task List */}
        <section className="task-section">

          <h2>{activeMenu}</h2>

          {filteredTasks.length === 0 ? (

            <p className="empty-message">
              {searchTerm
                ? "No matching tasks found."
                : "No tasks available. Click Add New Task to get started."}
            </p>

          ) : (

            <div className="task-list">

              {filteredTasks.map((task) => (

                <div className="task-item" key={task.id}>

                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <small>Due Date: {task.dueDate}</small>
                  </div>

                  <div className="task-actions">

                    <span
                      className={`priority ${(task.priority || "Low").toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(task.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => openEditForm(task)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Add / Edit Task Form */}
        {showForm && (
          <TaskForm
            onAddTask={addTask}
            onEditTask={editTask}
            onClose={closeForm}
            editingTask={editingTask}
          />
        )}

      </main>

    </div>
  );
}

export default App;
