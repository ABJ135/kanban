import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("task")) || []);
    const [object, setObject] = useState({ task: '', status: 'select' });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (object.task.trim() === '') {
            alert("Please enter a valid task.");
            return;
        }
        if (object.status === 'select') {
            alert("Please select a valid status.");
            return;
        }

        const newTask = { ...object, id: Date.now() };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("task", JSON.stringify(updatedTasks));
        navigate('/Task');
    };

    const handleChange = (e) => {
        setObject({ ...object, [e.target.name]: e.target.value });
    };

    const cancel = () => {
        setObject({ task: '', status: 'select' });
        navigate("/Task");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mt-10">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Add New Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Task</label>
                        <input
                            type="text"
                            name="task"
                            value={object.task}
                            placeholder="Enter Task"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Status</label>
                        <select
                            name="status"
                            value={object.status}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="select">Select Status</option>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                        >
                            Add Task
                        </button>
                        <button
                            type="button"
                            onClick={cancel}
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

export default AddTask;
