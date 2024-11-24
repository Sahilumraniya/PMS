import { FC, useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Task } from './types';
import { useDispatch } from 'react-redux';
import { deleteTask } from '@/redux/taskSlice';
import AddTaskModal from './AddTask';
import ViewTaskModal from './ViewTaskModal';

interface CardProps {
  task: Task;
  status: string;
}

const Card: FC<CardProps> = ({ task, status }) => {

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null); // Create a ref for the div
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { task, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const closeViewModal = () => setIsViewModalOpen(false);

  drag(ref); // Attach the drag function to the ref

  // State for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle edit, delete, and view details
  const handleEdit = () => {
    // dispatch(editTask(task)); // Trigger the edit action
    setIsModalOpen(true); // Open the modal
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id)); // Trigger the delete action
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleViewDetails = () => {
    // dispatch(editTask(task)); // Trigger the edit action
    setIsViewModalOpen(true); // Open the modal
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div
      ref={ref} // Use the ref here
      className={`p-4 bg-white rounded shadow cursor-pointer hover:cursor-grab ${isDragging ? 'border-2 border-red-500 border-dashed bg-transparent bg-white' : 'opacity-100'
        }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-semibold ${task.priority === 'Low' ? "text-yellow-500" : task.priority === 'High' ? "text-red-500" : "text-blue-700"}`}>{task.priority}</span>
        <div className="relative">
          {/* Ellipsis icon to open the dropdown */}
          <button onClick={toggleDropdown} className="text-gray-400 text-xl">
            ...
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-10">
              <ul>
                <li>
                  <button
                    onClick={handleEdit}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleDelete}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Delete
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleViewDetails}
                    className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left"
                  >
                    View Details
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{task.description}</p>
      <div className="flex items-center space-x-2">
        {task.assignees.map((assignee, index) => (
          <img
            key={index}
            src={assignee}
            alt="assignee"
            className="w-6 h-6 rounded-full border-2 border-white"
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
        <span>{task.comments} comments</span>
        <span>{task.files} files</span>
      </div>
      <AddTaskModal isOpen={isModalOpen} onClose={closeModal} task={task} />
      <ViewTaskModal isOpen={isViewModalOpen} onClose={closeViewModal} task={task} />
    </div>
  );
};

export default Card;
