import EventListItem from './eventListItem';
import Link from 'next/link';
import { FC } from 'react';
import { EventList } from '@/services/eventService/__generated__/EventList';

type TEventListProps = {
  events: EventList['events'];
};

const EventLists: FC<TEventListProps> = ({ events }) => {
  return (
    <div className='w-4/5 mx-auto text-slate-700 flex flex-col justify-center items-center'>
      {/* Event Lists container */}
      <div className='my-4 w-full'>
        {events?.length &&
          events.map((event, index) => (
            <EventListItem key={index} event={event} />
          ))}
      </div>
    </div>
  );
};

export default EventLists;
