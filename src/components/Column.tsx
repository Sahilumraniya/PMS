import { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Task } from './types';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { moveTask } from '@/redux/taskSlice';

interface ColumnProps {
  status: string;
  cards: Task[];
}

const Column: FC<ColumnProps> = ({ status, cards }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { task: Task; status: string }) => {
      if (item.status !== status) {
        dispatch(moveTask({ id: item.task._id, status }));
      }
    }
  });

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>} // Type cast to match HTMLDivElement type
      className={`relative p-4 rounded-lg shadow-lg bg-white border border-gray-200 transition-all duration-30`}
    >
      <div className='flex justify-between'>
        <div className='flex justify-center items-center space-x-2'>
          <div className={`w-2 h-2 rounded-[50%] ${status === "todo" ? 'bg-blue-500' : status === "inProgress" ? "bg-yellow-400" : "bg-green-600"}`}></div>
          <div className='text-lg font-semibold capitalize text-gray-800'>{status}</div>
          <div className="bg-gray-300 p-2 w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300">
            {cards.length}
          </div>
        </div>
      </div>
      <div className={`mt-2 ${status === "todo" ? 'bg-blue-500' : status === "inProgress" ? "bg-yellow-400" : "bg-green-600"} h-1 rounded-md w-full`}></div>
      <div className="space-y-4 mt-5">
        {cards.map((card, index) => (
          <Card key={card._id} task={card} status={status} />
        ))}
      </div>
    </div>
  );
};

export default Column;
