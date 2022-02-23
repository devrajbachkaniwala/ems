import EventListItem from './eventListItem';
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

type TEventListsProps = {
  ev: TEvent[];
  cancelBooking?: (id: number) => void;
};

export const events: TEvent[] = [
  {
    id: 1,
    name: 'Surat Video Speed Dating',
    date: new Date('2022-03-11'),
    time: '3:00',
    city: 'surat',
    state: 'gujarat',
    photos: [
      {
        photo: '/images/event-pic-1.jpg'
      }
    ],
    prices: [
      {
        price: 199
      }
    ]
  },
  {
    id: 2,
    name: 'How To Work From Home - Webinar Talk',
    date: new Date('2022-02-27'),
    time: '2:00',
    city: 'surat',
    state: 'gujarat',
    photos: [
      {
        photo: '/images/event-pic-2.jpg'
      }
    ],
    prices: [
      {
        price: 499
      }
    ]
  },
  {
    id: 3,
    name: 'How To Improve Your Focus and Limit Distractions',
    date: new Date('2022-02-23'),
    time: '11:30',
    city: 'surat',
    state: 'gujarat',
    photos: [
      {
        photo: '/images/event-pic-3.jpg'
      }
    ],
    prices: [
      {
        price: 399
      }
    ]
  }
];

const EventLists: FC<TEventListsProps> = ({ ev = events, cancelBooking }) => {
  return (
    <div className='w-4/5 mx-auto text-slate-700 flex flex-col justify-center items-center'>
      {/* Event Lists container */}
      <div className='my-4'>
        {events.map((event, index) => (
          <div key={index} className='relative'>
            <EventListItem event={event} />
            {cancelBooking && (
              <button
                onClick={() => cancelBooking(event.id)}
                className='text-red-600 border-2 border-red-600 px-2 relative bottom-3 rounded-md hover:text-white hover:bg-red-600 transition duration-200 ease-linear'
              >
                Cancel booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventLists;
