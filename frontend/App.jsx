import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles.css';

export default function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <Navbar />
      <main className="container">
        <TaskForm setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </main>
    </>
  );
}
