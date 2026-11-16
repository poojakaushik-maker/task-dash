
function TaskForm({ onAddTask, onEditTask, onClose, editingTask }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const taskData = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate"),
    };

    // Edit Existing Task
    if (editingTask) {
      onEditTask({
        ...editingTask,
        ...taskData,
      });
    } 
    
    // Add New Task
    else {
      onAddTask({
        id: Date.now(),
        ...taskData,
        status: "Pending",
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal">

        <h2>
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Task Title */}
          <label>Task Title *</label>
          <input
            type="text"
            name="title"
            defaultValue={editingTask?.title || ""}
            placeholder="Enter task title"
            required
          />

          {/* Description */}
          <label>Description</label>
          <textarea
            name="description"
            defaultValue={editingTask?.description || ""}
            placeholder="Enter description"
          />

          {/* Priority */}
          <label>Priority</label>
          <select
            name="priority"
            defaultValue={editingTask?.priority || "Low"}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Due Date */}
          <label>Due Date *</label>
          <input
            type="date"
            name="dueDate"
            defaultValue={editingTask?.dueDate || ""}
            required
          />

          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              {editingTask ? "Update Task" : "Add Task"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default TaskForm;
