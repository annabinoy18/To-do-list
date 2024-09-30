import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Handle input change
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Add task
    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    // Delete task
    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // Toggle task completion
    function toggleComplete(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    // Move task up
    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // Move task down
    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="wrapper">
            <div className='to-do-list'>
                <h1>To-Do List</h1>

                <div>
                    <input
                        type="text"
                        placeholder='Enter a task..'
                        value={newTask}
                        onChange={handleInputChange}
                    />

                    <button
                        className="add-button"
                        onClick={addTask}>
                        Add
                    </button>
                </div>

                <ol>
                    {tasks.map((task, index) => (
                        <li key={index} className={task.completed ? 'completed' : ''}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(index)}
                            />
                            <span className='text'>{task.text}</span>

                            <button
                                className='delete-button'
                                onClick={() => deleteTask(index)}>
                                Delete
                            </button>

                            <button
                                className='move-button'
                                onClick={() => moveTaskUp(index)}>
                                Up
                            </button>

                            <button
                                className='move-button'
                                onClick={() => moveTaskDown(index)}>
                                Down
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default ToDoList;
