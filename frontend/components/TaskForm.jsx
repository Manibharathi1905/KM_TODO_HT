import React, { useState } from 'react';

export default function TaskForm({ setTasks }) {
  const [text, setText] = useState('');

  const addTask = () => {
    if (!text.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
    setText('');
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Add new task..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}
