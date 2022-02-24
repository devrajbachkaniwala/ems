import Link from 'next/link';
import { TEvent } from 'pages/events';
import { FC } from 'react';
import { dateFormatter } from 'utils/dateFormatter';

type TEventListItemProps = {
  event: TEvent;
};

const EventListItem: FC<TEventListItemProps> = ({ event }) => {
  return (
    /* Event item container */
    <Link href={`/events/${event.id}`} passHref>
      <article className='flex flex-col-reverse md:flex-row my-6 max-w-[720px] bg-slate-100 rounded-md overflow-hidden hover:shadow-lg hover:cursor-pointer transition duration-200 ease-linear'>
        <div className='w-full md:w-[60%] px-4 py-3'>
          <h2 className='text-lg text-slate-800 font-bold'>{event.name}</h2>
          <p className='text-orange-600 font-bold my-2'>
            {dateFormatter(event.timings[0].date)}
          </p>
          <p className='text-slate-600 text-sm'>{`${event.city}, ${event.state}`}</p>
          <p className='text-slate-600 text-sm'>
            {event.prices[0].currency} {event.prices[0].price}
          </p>
        </div>
        <div className='w-full md:w-[40%]'>
          <img
            src={event.photos[0].photo}
            alt={event.name}
            className='h-[160px] w-full object-cover'
          />
        </div>
      </article>
    </Link>
  );
};

export default EventListItem;
