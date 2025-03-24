import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='w-auto bg-gray-800 top-0 p-3 h-16 flex justify-between items-center px-10'>
            <div className='text-white'>
                <Link className='mx-4' to="/AddTask">Add Task</Link>
                <Link className='mx-4' to="/Task">Task</Link>
            </div>
        </div>
    );
}

export default Navbar;
