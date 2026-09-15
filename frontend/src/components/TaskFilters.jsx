function TaskFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  onClearFilters,
}) {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  return (
    <section className="card">
      <h2>Search & Filters</h2>

      <div className="filters">

        <div className="form-group">
          <label htmlFor="search">Search Task</label>

          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search by task title..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="status-filter">Status</label>

          <select
            id="status-filter"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority-filter">Priority</label>

          <select
            id="priority-filter"
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employee-filter">Employee</label>

          <select
            id="employee-filter"
            name="employee"
            value={filters.employee}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Rahul">Rahul</option>
            <option value="Anu">Anu</option>
            <option value="Arjun">Arjun</option>
            <option value="Fathima">Fathima</option>
          </select>
        </div>

      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </section>
  );
}

export default TaskFilters;