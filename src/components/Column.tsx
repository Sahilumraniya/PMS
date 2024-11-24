import { FC } from 'react';
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
      console.log("STatus :", status, item.task);

      if (item.status !== status) {
        dispatch(moveTask({ id: item.task._id, status }));
      }
    },
  });

  return (
    <div ref={drop} className="p-4 bg-gray-100 rounded shadow">
      <h2 className="mb-4 text-lg font-bold capitalize">{status}</h2>
      <div className="space-y-4">
        {cards.map((card, index) => (
          <Card key={index} task={card} status={status} />
        ))}
      </div>
    </div>
  );
};

export default Column;
