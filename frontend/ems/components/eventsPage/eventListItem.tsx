/* eslint-disable @next/next/no-img-element */
import {
  EventList,
  EventList_events
} from '@/services/eventService/__generated__/EventList';
import Link from 'next/link';
import { FC } from 'react';
import { dateFormatter } from 'utils/dateFormatter';
import { isFreeEvent } from 'utils/isFreeEvent';

type TEventListItemProps = {
  event: EventList_events;
};

const EventListItem: FC<TEventListItemProps> = ({ event }) => {
  return (
    /* Event item container */
    <>
      {event &&
        event.timings?.length &&
        event.prices?.length &&
        event.photos?.length && (
          <Link href={`/events/${event.id}`} passHref>
            <div className='w-full'>
              <article className='flex flex-col-reverse md:flex-row my-6 max-w-[720px] md:w-[720px] bg-slate-100 rounded-md overflow-hidden hover:shadow-lg hover:cursor-pointer transition duration-200 ease-linear'>
                <div className='w-full md:w-[60%] px-4 py-3'>
                  <h2 className='text-lg text-slate-800 font-bold'>
                    {event.name}
                  </h2>
                  <p className='text-orange-600 font-bold my-2'>
                    {dateFormatter(new Date(event.timings[0].date))}
                  </p>
                  <p className='text-slate-600 text-sm capitalize'>{`${event.city}, ${event.state}, ${event.country}`}</p>
                  <div className='text-slate-600 text-sm mt-2'>
                    {isFreeEvent(event.prices[0].price) ? (
                      <div>Free</div>
                    ) : (
                      <div className='uppercase'>
                        {`${event.prices[0].currency} ${event.prices[0].price}`}
                      </div>
                    )}
                  </div>
                </div>
                <div className='w-full md:w-[40%]'>
                  <img
                    src={event.photos[0].photo}
                    alt={event.name}
                    className='h-[160px] w-full object-cover'
                  />
                </div>
              </article>
            </div>
          </Link>
        )}
    </>
  );
};

export default EventListItem;
