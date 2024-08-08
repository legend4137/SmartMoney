import React from "react";

const ReadOnlyTodoList = ({ todos = [] }) => {
  return (
    <div className="h-100 w-full flex items-center justify-center bg-gray-900 font-sans">
      <div className="bg-gray-800 rounded shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-white text-2xl">FINANCIAL GOALS</h1>
        </div>
        <div className="h-64 overflow-y-scroll mb-4">
          {todos.length === 0 ? (
            <p className="text-gray-400">No todos available</p>
          ) : (
            todos.map((todo, index) => (
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
              </div>
            ))
          )}
        </div>
        <button
          className="mt-4 flex-no-shrink p-2 border-2 rounded text-purple-500 border-purple-500 hover:text-white hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50"
          onClick={() => console.log("Button Clicked")}
        >
          ADD FINANCIAL GOALS
        </button>
      </div>
    </div>
  );
};

export default ReadOnlyTodoList;
