import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    // { text: "Add another component to Tailwind Components", completed: false },
    // { text: "Submit Todo App Component to Tailwind Components", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
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
        <div>
          {todos.map((todo, index) => (
            <div className="flex mb-4 items-center" key={index}>
              <p
                className={`w-full ${
                  todo.completed
                    ? "line-through text-green-400"
                    : "text-white"
                }`}
              >
                {todo.text}
              </p>
              <button
                className={`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded transition-all duration-300 transform hover:scale-105 ${
                  todo.completed
                    ? "text-gray-400 border-gray-400 hover:bg-gray-500 hover:text-white"
                    : "text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                } hover:shadow-lg hover:shadow-${todo.completed ? 'gray' : 'green'}-500/50`}
                onClick={() => toggleTodo(index)}
              >
                {todo.completed ? "Not Done" : "Done"}
              </button>
              <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-400 hover:text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                onClick={() => removeTodo(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
