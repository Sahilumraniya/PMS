import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '@/redux/taskSlice';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, task }) => {

    const dispatch = useDispatch();

    // State for the form fields
    const [formTask, setFormTask] = useState<Task>({
        _id: '',
        title: '',
        description: '',
        priority: 'Medium',
        assignees: [],
        comments: 0,
        files: 0,
        dueDate: '',
        status: 'todo',
    });

    // Initialize the form with the task data if it's provided (for editing)
    useEffect(() => {
        if (task) {
            setFormTask(task); // Populate the form if editing
        } else {
            setFormTask({
                _id: '',
                title: '',
                description: '',
                priority: 'Medium',
                assignees: [],
                comments: 0,
                files: 0,
                dueDate: '',
                status: 'todo',
            });
        }
    }, [task]);

    // Handle changes in form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormTask({
            ...formTask,
            [name]: value,
        });
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormTask({
            ...formTask,
            priority: e.target.value as 'High' | 'Medium' | 'Low',
        });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormTask({
            ...formTask,
            status: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (task) {
            dispatch(updateTask(formTask)); // Dispatch the edit action
        } else {
            // Adding a new task: append to the tasks array
            dispatch(addTask(formTask));
        }

        onClose(); // Close modal after submit
    };

    if (!isOpen) return null; // Don't render the modal if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">{task ? 'Edit Task' : 'Add a New Task'}</h2>

                <form onSubmit={handleSubmit}>
                    {/* Task Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formTask.title}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Task Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formTask.description}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Priority */}
                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-gray-700">Priority</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formTask.priority}
                            onChange={handlePriorityChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formTask.status}
                            onChange={handleStatusChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                        >
                            <option value="todo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {/* Assignees */}
                    <div className="mb-4">
                        <label htmlFor="assignees" className="block text-gray-700">Assignees (Comma Separated)</label>
                        <input
                            type="text"
                            id="assignees"
                            name="assignees"
                            value={formTask.assignees.join(', ')}
                            onChange={(e) => setFormTask({ ...formTask, assignees: e.target.value.split(',').map(item => item.trim()) })}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Due Date */}
                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block text-gray-700">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formTask.dueDate}
                            onChange={(e) => setFormTask({ ...formTask, dueDate: e.target.value })}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Comments 
                    <div className="mb-4">
                        <label htmlFor="comments" className="block text-gray-700">Number of Comments</label>
                        <input
                            type="number"
                            id="comments"
                            name="comments"
                            value={formTask.comments}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                            min="0"
                        />
                    </div>*/}

                    {/* Files 
                    <div className="mb-4">
                        <label htmlFor="files" className="block text-gray-700">Number of Files</label>
                        <input
                            type="number"
                            id="files"
                            name="files"
                            value={formTask.files}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                            min="0"
                        />
                    </div>*/}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                        >
                            {task ? 'Save Changes' : 'Add Task'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg shadow-md hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
