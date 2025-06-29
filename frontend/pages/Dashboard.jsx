import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";

const socket = io("http://localhost:5000");

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const token = localStorage.getItem("token");

  const fetchTasks = () => {
    axios.get("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();

    socket.on("taskCreated", fetchTasks);
    socket.on("taskUpdated", fetchTasks);
    socket.on("taskDeleted", fetchTasks);

    return () => socket.disconnect();
  }, []);

  const deleteTask = async (id) => {
    if (window.confirm("Delete task?")) {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Task deleted");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 bg-white shadow rounded flex justify-between">
            <div>
              <div className="font-bold">{task.title}</div>
              <div className="text-sm text-gray-600">{task.status}</div>
            </div>
            <div className="space-x-2">
              <button onClick={() => setEditingTask(task)} className="text-blue-600">Edit</button>
              <button onClick={() => deleteTask(task._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
