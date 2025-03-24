import React from 'react';

function Delete({ taskId, setTasks }) {

  const handleDelete = () => {
    const storedTasks = JSON.parse(localStorage.getItem('task')) || [];
    const updatedTasks = storedTasks.filter(task => task.id !== taskId);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);  // Update parent state

    // ✅ Force UI to update immediately
    window.location.reload();
  };

  return (
    <button className="bg-red-500 text-white p-2 rounded" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default Delete;
