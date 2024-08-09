import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userName = localStorage.getItem("username"); // Replace with dynamic user name if applicable
  const navigate = useNavigate(); // Hook for navigation

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
    }
  };

  const handleRedirect = () => {
    navigate('/financialgoals'); // Replace with your target route
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-gray-900 font-sans">
      <div className="bg-gray-800 rounded shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-white text-2xl">FINANCIAL GOALS</h1>
          <div className="flex mt-4">
          </div>
        </div>
        {loading ? (
          <p className="text-white">Loading goals...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {todos.map((todo, index) => (
              <div className="flex mb-4 items-center p-4 border border-gray-600 rounded" key={index}>
                <p className="w-full text-white">{todo}</p>

              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            className="p-3 border-2 border-purple-500 rounded-lg text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            onClick={handleRedirect}
          >
            Go to Other Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
