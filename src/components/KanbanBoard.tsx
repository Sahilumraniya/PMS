"use client"; // This ensures that the component is treated as a client-side component

import { FC, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';
import { Task } from './types';
import AddTaskModal from './AddTask';
import { useSelector } from 'react-redux';
import { isThisMonth, isThisWeek } from '@/utils/DateHelper';

const KanbanBoard: FC = () => {
    const tasks = useSelector((state: any) => state.tasks.tasks); // Getting tasks from Redux store
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for filters
    const [priorityFilter, setPriorityFilter] = useState<string>('All');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [dueDateFilter, setDueDateFilter] = useState<string>('All');

    // Toggle modal visibility
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Filter tasks based on selected filters
    const filteredTasks = tasks.filter((task: Task) => {
        const matchesPriority =
            priorityFilter === 'All' || task.priority === priorityFilter;
        const matchesStatus =
            statusFilter === 'All' || task.status === statusFilter;
        const matchesDueDate =
            dueDateFilter === 'All' ||
            (dueDateFilter === 'Today' && task.dueDate === new Date().toLocaleDateString()) ||
            (dueDateFilter === 'This Week' && task.dueDate && isThisWeek(task.dueDate)) ||
            (dueDateFilter === 'This Month' && task.dueDate && isThisMonth(task.dueDate));

        return matchesPriority && matchesStatus && matchesDueDate;
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-between items-center p-4">
                {/* Filter Dropdowns */}
                <div className="flex space-x-4">
                    <select
                        className="p-2 border rounded"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="All">All Priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <select
                        className="p-2 border rounded"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="todo">To Do</option>
                        <option value="inProgress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <select
                        className="p-2 border rounded"
                        value={dueDateFilter}
                        onChange={(e) => setDueDateFilter(e.target.value)}
                    >
                        <option value="All">All Due Dates</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                    </select>
                </div>

                <button
                    onClick={openModal}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                >
                    Add Task
                </button>
            </div>

            {/* Task Columns */}
            <div className="grid grid-cols-3 gap-4 p-6">
                {['todo', 'inProgress', 'done'].map((status) => (
                    <Column
                        key={status}
                        status={status}
                        cards={filteredTasks.filter((task: Task) => task.status === status)}
                    />
                ))}
            </div>

            {/* Add Task Modal */}
            <AddTaskModal isOpen={isModalOpen} onClose={closeModal} />
        </DndProvider>
    );
};

export default KanbanBoard;
