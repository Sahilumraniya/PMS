import { FC } from 'react';
import { FaBars } from 'react-icons/fa';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-700 bg-gray-200 rounded lg:hidden hover:bg-gray-300"
      >
        <FaBars />
      </button>
      <h2 className="text-xl font-bold">Mobile App</h2>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Invite
        </button>
        <img
          src="/avatar.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Header;
