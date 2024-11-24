
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/components/types';

const initialState: { tasks: Task[] } = {
    tasks: typeof window !== "undefined" && JSON.parse(localStorage.getItem('tasks') || '[]'), // Load tasks from localStorage on initial load
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save tasks to localStorage
        },
        addTask(state, action: PayloadAction<Task>) {
            console.log("Add Task : ", action.payload);
            // generate unique id
            action.payload._id = Math.random().toString(36).substr(2, 9);
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save updated tasks to localStorage
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save updated tasks to localStorage
            }
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save updated tasks to localStorage
        },
        moveTask(state, action: PayloadAction<{ id: string; status: string }>) {
            const { id, status } = action.payload;
            const task = state.tasks.find(task => task._id === id);
            if (task) {
                task.status = status;
                localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save updated tasks to localStorage
            }
        },
    },
});

export const { setTasks, addTask, updateTask, deleteTask, moveTask } = taskSlice.actions;

export default taskSlice.reducer;
