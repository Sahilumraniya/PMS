"use client";
import { FC, useState } from 'react';
import KanbanBoard from '@/components/KanbanBoard';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
const Home: FC = () => {

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex w-full">
      {/* Main content */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main className={`flex-1 transition-all duration-300`}>
        <Header toggleSidebar={toggleSidebar} />
        <KanbanBoard />
      </main>
    </div>
  );
};

export default Home;
