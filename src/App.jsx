import React, { useState, useEffect } from "react";
import ApiMethods from "./api/methods/apiMethods";

const TodoComponent = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [filters, setFilters] = useState({
    pageNo: 1,
    pageSize: 10,
    query: '',
    search: '',
    sorting: ''
  });

  // Fetch todos with filters
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await ApiMethods.todos.fetchAll("/todos",filters, setLoading);
        setTodos(result);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [filters]); // Fetch again when filters change

  // Handle form submission for creating a new todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const result = await ApiMethods.todos.create(newTodo, setLoading);
      setTodos([...todos, result]); // Add new todo to the list
      setNewTodo({ title: "", completed: false }); // Reset form
      console.log("Todo created:", result);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await ApiMethods.todos.delete(id, setLoading);
      setTodos(todos.filter((todo) => todo.id !== id)); // Remove deleted todo from list
      console.log("Todo deleted");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>

      {loading && <p>Loading...</p>}

      {/* Form to create a new todo */}
      <form onSubmit={handleCreateTodo}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={newTodo.completed}
              onChange={(e) =>
                setNewTodo({ ...newTodo, completed: e.target.checked })
              }
            />
          </label>
        </div>
        <button type="submit">Add Todo</button>
      </form>

      {/* Table to display todos */}
      {todos.length > 0 ? (
        <table border="1" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No todos available</p>
      )}

      {/* Pagination controls */}
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoComponent;