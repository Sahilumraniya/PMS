import { logout } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const user = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(user);

  const userLogout = () => {
    dispatch(logout());
    router.push('/login');
  }

  useEffect(() => {
    if (!user) {
      dispatch(logout());
    }
  }, [user, dispatch]);

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-700 bg-gray-200 rounded lg:hidden hover:bg-gray-300"
      >
        <FaBars />
      </button>
      <h2 className="text-xl font-bold">
        Dashboard
      </h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span>{user?.name}</span>
        </div>
        <button onClick={userLogout} className="px-4 py-2 text-white hover:cursor-pointer bg-red-500 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
