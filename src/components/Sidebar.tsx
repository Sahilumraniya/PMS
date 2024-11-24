import { FC } from 'react';
import { FaHome, FaTasks, FaUsers, FaCog, FaProjectDiagram } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Home', icon: <FaHome />, path: '/' },
        { label: 'Tasks', icon: <FaTasks />, path: '/tasks' },
        { label: 'Members', icon: <FaUsers />, path: '/members' },
        { label: 'Settings', icon: <FaCog />, path: '/settings' },
    ];

    const projects = [
        { label: 'Mobile App', icon: <FaProjectDiagram />, path: '/mobile-app' },
        { label: 'Web Dashboard', icon: <FaProjectDiagram />, path: '/web-dashboard' },
    ];

    return (
        <aside
            className={`flex flex-col bg-white h-screen border-r transition-all duration-300 ${
                isCollapsed ? 'w-16' : 'w-64'
            }`}
        >
            <div className="flex justify-between items-center px-4 py-3">
                {!isCollapsed && <h1 className="font-bold">Project Management</h1>}
                <button
                    onClick={toggleSidebar}
                    className="text-gray-700 hover:bg-gray-100 p-2 rounded"
                >
                    {isCollapsed ? '>>' : '<<'}
                </button>
            </div>
            <nav className="mt-4 space-y-2 flex-1">
                {/* Main Menu */}
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.path}>
                        <div
                            className={`flex items-center py-2 px-4 text-gray-700 cursor-pointer transition-all rounded-md ${
                                isCollapsed ? 'justify-center' : 'justify-start'
                            } ${
                                pathname === item.path
                                    ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <div className="mr-2">{item.icon}</div>
                            {!isCollapsed && <span>{item.label}</span>}
                        </div>
                    </Link>
                ))}

                {/* Projects Section */}
                <div className="mt-4">
                    {!isCollapsed && <p className="px-4 text-gray-500 text-sm">Projects</p>}
                    {projects.map((project, index) => (
                        <Link key={index} href={project.path}>
                            <div
                                className={`flex items-center py-2 px-4 text-gray-700 cursor-pointer transition-all rounded-md ${
                                    isCollapsed ? 'justify-center' : 'justify-start'
                                } ${
                                    pathname.startsWith(project.path)
                                        ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <div className="mr-2">{project.icon}</div>
                                {!isCollapsed && <span>{project.label}</span>}
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
