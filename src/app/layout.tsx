"use client"
import './globals.css'; // Add Tailwind CSS here
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <html lang="en">
      <body className="flex">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1">
          <Header toggleSidebar={toggleSidebar} />{children}</main>
      </body>
    </html>
  );
}
