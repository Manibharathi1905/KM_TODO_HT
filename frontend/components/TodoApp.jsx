import React, { useState } from "react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task.trim(), completed: false }]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide drop-shadow-md">
          🌟 My Todo List
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="What’s your next task?"
            className="flex-grow px-5 py-3 rounded-2xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none shadow-sm transition"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            aria-label="Add task"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-400 italic select-none">
            No tasks yet — start by adding one!
          </p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {todos.map(({ id, text, completed }) => (
              <li
                key={id}
                className={`flex items-center justify-between p-4 rounded-2xl shadow-md transition-colors duration-300 cursor-pointer select-none
                ${completed ? "bg-pink-100 border border-pink-300" : "bg-gray-50 border border-gray-200 hover:bg-pink-50"}`}
                onClick={() => toggleComplete(id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-7 h-7 flex justify-center items-center rounded-full border-2 transition-colors duration-300
                    ${completed ? "bg-pink-500 border-pink-500 text-white" : "border-gray-400 text-transparent"}`}
                  >
                    ✓
                  </div>
                  <span
                    className={`text-lg font-semibold select-text transition-colors duration-300 ${
                      completed ? "line-through text-pink-600" : "text-gray-900"
                    }`}
                  >
                    {text}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(id);
                  }}
                  aria-label="Delete task"
                  className="text-pink-500 hover:text-pink-700 font-extrabold text-xl transition-colors duration-300"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
