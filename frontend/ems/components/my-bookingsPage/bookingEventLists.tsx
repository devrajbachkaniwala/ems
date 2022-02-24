import { TMyBookings } from 'pages/my-bookings';
import { FC, ReactNode } from 'react';
import BookingEventListItem from './bookingEventListItem';

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

type TBookingEventListsProps = {
  myBookings: TMyBookings[];
};

/* export const events: TEvent[] = [
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
]; */

const BookingEventLists: FC<TBookingEventListsProps> = ({
  myBookings,
  children
}) => {
  return (
    <div className='w-4/5 mx-auto text-slate-700 flex flex-col justify-center items-center'>
      {/* Event Lists container */}
      {children}
      <div className='my-4'>
        {myBookings.map((booking, index) => (
          <BookingEventListItem key={index} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingEventLists;
