import { FC } from 'react';
import { Task } from './types';

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const ViewTaskModal: FC<ViewTaskModalProps> = ({ isOpen, onClose, task }) => {
  if (!task) return null; // If no task is passed, return null

  // Helper function to render assignee avatars
  const renderAssignees = () => {
    return task.assignees.length > 0 ? (
      task.assignees.map((assignee, index) => (
        <img
          key={index}
          src={assignee}
          alt={`Assignee ${index + 1}`}
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      ))
    ) : (
      <span>No Assignees</span>
    );
  };

  return (
    <div className={`fixed inset-0 flex items-center cursor-pointer justify-center bg-gray-500 bg-opacity-75 z-50 ${!isOpen ? 'hidden' : ''}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>

        {/* Task Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <strong className="text-gray-700">Priority:</strong> 
          <span className={`text-sm font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-blue-500' : 'text-yellow-500'}`}>{task.priority}</span>
        </div>

        {/* Status */}
        <div className="mb-4">
          <strong className="text-gray-700">Status:</strong>
          <span className="text-sm font-semibold text-gray-600">{task.status}</span>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <strong className="text-gray-700">Due Date:</strong>
          <span className="text-sm font-semibold text-gray-600">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</span>
        </div>

        {/* Assignees */}
        <div className="mb-4">
          <strong className="text-gray-700">Assignees:</strong>
          <div className="flex space-x-2">
            {renderAssignees()}
          </div>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <strong className="text-gray-700">Comments:</strong>
          <span className="text-sm font-semibold text-gray-600">{task.comments}</span>
        </div>

        {/* Files
        <div className="mb-4">
          <strong className="text-gray-700">Files:</strong>
          <div className="space-y-2">
            {task.files.length > 0 ? (
              task.files.map((file, index) => (
                <div key={index} className="text-blue-500 hover:underline">
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    {file}
                  </a>
                </div>
              ))
            ) : (
              <span>No Files Attached</span>
            )}
          </div>
        </div> */}

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg shadow-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
