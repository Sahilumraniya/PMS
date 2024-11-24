"use client"
import { Provider } from 'react-redux';
import './globals.css'; // Add Tailwind CSS here
import store from '@/redux/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="flex w-full">
          {children}
        </body>
      </html>
    </Provider>
  );
}
