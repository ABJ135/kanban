import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Edit() {
  const { id } = useParams();
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('task')) || []);
  const [taskToEdit, setTaskToEdit] = useState({ id: null, task: '', status: 'todo' });
  const navigate = useNavigate();

  useEffect(() => {
    const task = tasks.find(task => task.id === Number(id));
    if (task) {
      setTaskToEdit(task);
    }
  }, [tasks, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskToEdit(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map(task =>
      task.id === taskToEdit.id ? taskToEdit : task
    );

    localStorage.setItem('task', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    navigate('/Task');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Edit Task</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Input */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2">Task</label>
            <input
              type="text"
              name="task"
              value={taskToEdit.task}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2">Status</label>
            <select
              name="status"
              value={taskToEdit.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button 
              type="submit" 
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Update Task
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/Task')}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
