import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userName = sessionStorage.getItem("username"); // Replace with dynamic user name if applicable

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    try {
      const response = await axios.get(`http://localhost:12000/financialgoals/${userName}`);
      if (response.status === 200) {
        setTodos(response.data);
      } else {
        setError("Failed to fetch goals.");
      }
    } catch (err) {
      setError("Error fetching goals");
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo !== "" && !todos.includes(trimmedTodo)) {
      try {
        const response = await axios.post("http://localhost:12000/financialgoals/add", {
          userName,
          goalName: trimmedTodo,
        });

        if (response.status === 200) {
          setTodos(response.data.goals);
          setNewTodo("");
        } else {
          setError("Failed to add goal.");
        }
      } catch (err) {
        setError("Error adding goal");
        console.error("Error adding goal:", err);
      }
    }
  };

  const removeTodo = async (index) => {
    try {
      const response = await axios.post("http://localhost:12000/financialgoals/remove", {
        userName,
        goalNo: index,
      });

      if (response.status === 200) {
        setTodos(response.data.goals);
      } else {
        setError("Failed to remove goal.");
      }
    } catch (err) {
      setError("Error removing goal");
      console.error("Error removing goal:", err);
    }
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-gray-900 font-sans">
      <div className="bg-gray-800 rounded shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-white text-2xl">FINANCIAL GOALS</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border-none rounded w-full py-2 px-3 mr-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add A Financial Goal"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              className="flex-no-shrink p-2 border-2 rounded text-purple-500 border-purple-500 hover:text-white hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
        </div>
        {loading ? (
          <p className="text-white">Loading goals...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {todos.map((todo, index) => (
              <div
                className="flex mb-4 items-center p-4 border border-gray-600 rounded"
                key={index}
              >
                <p className="w-full text-white">{todo}</p>
                <button
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-400 hover:text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                  onClick={() => removeTodo(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
