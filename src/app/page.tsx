"use client";
import { FC } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { Provider } from 'react-redux';
import store from '@/redux/store';
const Home: FC = () => {

  return (
    <div className="flex">
      {/* Main content */}
      <Provider store={store}>
        <main className={`flex-1 transition-all duration-300`}>
          <KanbanBoard />
        </main>
      </Provider>
    </div>
  );
};

export default Home;
