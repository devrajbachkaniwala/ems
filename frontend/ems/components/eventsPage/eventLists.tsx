import EventListItem from './eventListItem';
import Link from 'next/link';
import { FC } from 'react';
import { TEvent } from 'pages/events';

type TEventListsProps = {
  events: TEvent[];
};

const EventLists: FC<TEventListsProps> = ({ events }) => {
  return (
    <div className='w-4/5 mx-auto text-slate-700 flex flex-col justify-center items-center'>
      {/* Event Lists container */}
      <div className='my-4'>
        {events.map((event, index) => (
          <EventListItem key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventLists;
