import Link from 'next/link';
import { FC } from 'react';

type TEvent = {
  id: number;
  name: string;
  date: Date;
  time: string;
  city: string;
  state: string;
  photos: {
    photo: string;
  }[];
  prices: {
    price: number;
  }[];
};

type TEventListItemProps = {
  event: TEvent;
};

const EventListItem: FC<TEventListItemProps> = ({ event }) => {
  return (
    /* Event item container */
    <Link href={`/events/${event.id}`} passHref>
      <article className='grid sm:grid-cols-2 my-6 max-w-[720px] bg-slate-100 rounded-md overflow-hidden hover:shadow-lg hover:cursor-pointer transition duration-200 ease-linear'>
        <div className='px-4 py-3'>
          <h2 className='text-lg text-slate-800 font-bold'>{event.name}</h2>
          <p className='text-orange-600 font-bold my-2'>
            {event.date.toLocaleDateString()}
          </p>
          <p className='text-slate-600 text-sm'>{`${event.city}, ${event.state}`}</p>
          <p className='text-slate-600 text-sm'>{event.prices[0].price}</p>
        </div>
        <div className='row-start-1 row-end-2 sm:col-start-2 sm:col-end-3'>
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
