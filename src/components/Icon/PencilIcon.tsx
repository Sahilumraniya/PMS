import React from "react";

interface PencilIconProps {
  onClick: () => void;  // Define the onClick prop type
}

const PencilIcon: React.FC<PencilIconProps> = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer"
  >
    <path d="M12 20h9" />
    <path d="M14.828 16.828l4.243-4.243a2 2 0 0 0 0-2.828L16.828 5.172a2 2 0 0 0-2.828 0L9.343 8.586 15.414 14.657l4.243-4.243a2 2 0 0 1 0 2.828l-4.243 4.243z" />
  </svg>
);

export default PencilIcon;
