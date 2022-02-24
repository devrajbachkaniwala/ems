import EventLists from 'components/eventsPage/eventLists';
import { FaSearch } from 'react-icons/fa';

export type TEvent = {
  id: number;
  name: string;
  city: string;
  state: string;
  timings: {
    id: number;
    date: Date;
    startTime: string;
    endTime: string;
  }[];
  photos: {
    id: number;
    photo: string;
  }[];
  prices: {
    id: number;
    price: number;
    currency: string;
  }[];
};

export const events: TEvent[] = [
  {
    id: 1,
    name: 'Surat Video Speed Dating',
    city: 'surat',
    state: 'gujarat',
    timings: [
      {
        id: 1001,
        date: new Date('2022-03-11'),
        startTime: '15:00',
        endTime: '18:00'
      }
    ],
    photos: [
      {
        id: 2001,
        photo: '/images/event-pic-1.jpg'
      }
    ],
    prices: [
      {
        id: 3001,
        price: 199,
        currency: 'INR'
      }
    ]
  },
  {
    id: 2,
    name: 'How To Work From Home - Webinar Talk',
    city: 'surat',
    state: 'gujarat',
    timings: [
      {
        id: 1002,
        date: new Date('2022-02-27'),
        startTime: '11:00',
        endTime: '16:00'
      }
    ],
    photos: [
      {
        id: 2002,
        photo: '/images/event-pic-2.jpg'
      }
    ],
    prices: [
      {
        id: 3002,
        price: 499,
        currency: 'INR'
      }
    ]
  },
  {
    id: 3,
    name: 'How To Improve Your Focus and Limit Distractions',
    city: 'surat',
    state: 'gujarat',
    timings: [
      {
        id: 1003,
        date: new Date('2022-02-23'),
        startTime: '11:30',
        endTime: '19:00'
      }
    ],
    photos: [
      {
        id: 2003,
        photo: '/images/event-pic-3.jpg'
      }
    ],
    prices: [
      {
        id: 3003,
        price: 399,
        currency: 'INR'
      }
    ]
  }
];

const Events = () => {
  return (
    <div>
      {/* Event Search Bar */}
      <div className='w-4/5 mx-auto border-2 border-slate-400 max-w-[720px] my-3 flex flex-row items-center rounded'>
        <FaSearch className='text-slate-400 text-lg mx-1' />
        <input
          type='text'
          placeholder='search'
          className='w-full px-2 py-2 text-lg text-slate-700 focus:outline-none'
        />
      </div>
      {/* Event lists */}
      <EventLists events={events} />
    </div>
  );
};

export default Events;
