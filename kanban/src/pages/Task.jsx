import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Delete from "../components/Delete";

const getStoredTasks = () => {
  try {
    const storedTasks = JSON.parse(localStorage.getItem("task"));
    if (Array.isArray(storedTasks)) {
      return {
        todo: storedTasks.filter(task => task.status === "todo"),
        "in-progress": storedTasks.filter(task => task.status === "in-progress"),
        completed: storedTasks.filter(task => task.status === "completed"),
      };
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  return { todo: [], "in-progress": [], completed: [] };
};

function Task() {
  const [tasks, setTasks] = useState(getStoredTasks());
  const navigate = useNavigate();

  useEffect(() => {
    const allTasks = [...tasks.todo, ...tasks["in-progress"], ...tasks.completed];
    localStorage.setItem("task", JSON.stringify(allTasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const sourceItems = Array.from(tasks[sourceColumn]);
    const destItems = sourceColumn === destColumn ? sourceItems : Array.from(tasks[destColumn]);

    const [movedItem] = sourceItems.splice(source.index, 1);
    movedItem.status = destColumn;
    destItems.splice(destination.index, 0, movedItem);

    const updatedTasks = {
      ...tasks,
      [sourceColumn]: sourceItems,
      [destColumn]: destItems,
    };

    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Kanban Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-around gap-4">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  className="w-1/3 p-4 bg-white rounded-lg shadow-md"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-lg font-semibold text-center mb-4">{columnId.toUpperCase()}</h2>

                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="p-3 mb-2 bg-gray-200 rounded shadow cursor-grab flex justify-between items-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>{task.task}</span>
                          <div>
                            <button
                              className="bg-blue-500 text-white p-2 rounded mr-2"
                              onClick={() => navigate(`/Edit/${task.id}`)}
                            >
                              Edit
                            </button>
                            <Delete taskId={task.id} setTasks={setTasks} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Task;
