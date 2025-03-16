import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AddTask() {
   
    return (
        <div>
            <div>
            <Navbar />
                <div className='container mx-auto p-6'>
                    <h2 className="text-2xl font-bold mb-4">Task Information</h2>

                    <form className='bg-white shadow-md rounded-lg p-6' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="task">Task</label>
                            <input
                                type="text"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                name="task"
                                value={object.task}
                                placeholder="Task"
                                onChange={handleChange}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="status">Status</label>
                            <select
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                name="status"
                                value={object.status}
                                onChange={handleChange}
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div >

                        <div className='flex items-center justify-center'>
                            <button className='border rounded-lg p-3 m-2 bg-green-500' type="submit">Add Task</button>
                            <button className='border rounded-lg p-3 m-2 bg-red-500' onClick={cancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
