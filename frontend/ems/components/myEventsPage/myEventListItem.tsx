/* eslint-disable @next/next/no-img-element */
import eventService from '@/services/eventService';
import { MyEvents_organization_events } from '@/services/eventService/__generated__/MyEvents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TMyBooking } from 'pages/my-bookings';
import { TMyEvent } from 'pages/organization/[orgId]/my-events';
import { FC, MouseEventHandler } from 'react';
import { dateFormatter } from 'utils/dateFormatter';
import { isFreeEvent } from 'utils/isFreeEvent';

/* type TEvent = {
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
}; */

type TMyEventListItemProps = {
  myEvent: MyEvents_organization_events;
  deleteEventById: (eventId: string) => Promise<void>;
};

const MyEventListItem: FC<TMyEventListItemProps> = ({
  myEvent,
  deleteEventById
}) => {
  const { photos, prices, timings } = myEvent;
  const router = useRouter();

  return (
    /* Event item container */
    <div>
      {myEvent && photos?.length && prices?.length && timings?.length && (
        <article className='flex flex-col flex-wrap my-6 max-w-[720px] h-fit bg-slate-100 rounded-md overflow-hidden hover:shadow-lg transition duration-200 ease-linear'>
          <div className='flex flex-col-reverse md:flex-row'>
            <div className='px-4 py-3 w-full md:w-[60%]'>
              <h2 className='text-lg text-slate-800 font-bold'>
                {myEvent.name}
              </h2>
              <p className='text-orange-600 font-bold my-2'>
                {dateFormatter(new Date(timings[0].date))}
              </p>
              <p className='text-slate-600 text-sm capitalize'>{`${myEvent.city}, ${myEvent.state}, ${myEvent.country}`}</p>

              <div className='mt-2 text-slate-600 text-sm'>
                <p>
                  {isFreeEvent(prices[0].price)
                    ? 'Free'
                    : `${prices[0].currency.toUpperCase()} ${prices[0].price}`}
                </p>
              </div>
              <div className='mt-2 flex'>
                <Link href={`/events/${myEvent.id}/edit`} passHref>
                  <button className='text-blue-600 border-2 border-blue-600 w-1/2 mr-2  rounded-md hover:text-white hover:bg-blue-600 transition duration-200 ease-linear'>
                    Edit
                  </button>
                </Link>
                <button
                  className='text-red-600 border-2 border-red-600 w-1/2 mr-2 rounded-md hover:text-white hover:bg-red-600 transition duration-200 ease-linear'
                  onClick={() => deleteEventById(myEvent.id)}
                >
                  Delete
                </button>
                <Link href={`/events/${myEvent.id}`} passHref>
                  <button className='text-green-700 border-2 border-green-700 w-1/2  rounded-md hover:text-white hover:bg-green-700 transition duration-200 ease-linear'>
                    Show details
                  </button>
                </Link>
              </div>
            </div>
            <div className='w-full md:w-[40%]'>
              <img
                src={photos[0].photo}
                alt={myEvent.name}
                className='h-[200px] w-full object-cover'
              />
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default MyEventListItem;
