import React from "react";
import TodoList from "./GoalComponent";
import ChatPopup from './ChatPopup';
import Navbar from './navbar';

const TodoPage = () => {
  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <Navbar /> {/* Navbar stays at the top */}
      <div className="flex-1 flex items-center justify-center">
        <TodoList />
      </div>
      <ChatPopup />
    </div>
  );
};

export default TodoPage;
