/* eslint-disable @next/next/no-img-element */
import {
  GetUserBookings_myBookings,
  GetUserBookings_myBookings_bookingItem,
  GetUserBookings_myBookings_bookingItem_timing,
  GetUserBookings_myBookings_event
} from '@/services/bookingService/__generated__/GetUserBookings';
import Link from 'next/link';
import { TMyBooking } from 'pages/my-bookings';
import { FC, MouseEventHandler } from 'react';
import { dateFormatter } from 'utils/dateFormatter';

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

type TBookingEventListItemProps = {
  booking: GetUserBookings_myBookings;
  cancelBooking: (bookingId: string) => Promise<void>;
};

const BookingEventListItem: FC<TBookingEventListItemProps> = ({
  booking,
  cancelBooking
}) => {
  const { event, bookingItem } = booking;
  const { qty, price, timing } = bookingItem;

  return (
    <>
      {event && bookingItem && event.photos?.length ? (
        /* Event item container */
        //<Link href={`/events/${event.id}`} passHref>
        <article className='flex flex-col flex-wrap my-6 max-w-[720px] bg-slate-100 rounded-md overflow-hidden hover:shadow-lg transition duration-200 ease-linear'>
          <div className='flex flex-col-reverse md:flex-row'>
            <div className='px-4 py-3 w-full md:w-[60%]'>
              <h2 className='text-lg text-slate-800 font-bold'>{event.name}</h2>
              <p className='text-orange-600 font-bold my-2'>
                {dateFormatter(new Date(timing.date))}
              </p>
              <p className='text-slate-600 text-sm capitalize'>{`${event.city}, ${event.state}, ${event.country}`}</p>

              <div className='mt-2 text-slate-600 text-sm'>
                <p className='capitalize'>Status {bookingItem.status}</p>
                <p>
                  Booked {qty} of price {price.currency.toUpperCase()}{' '}
                  {price.price}
                </p>
                <p className='font-semibold'>
                  Paid {price.currency.toUpperCase()} {price.price * qty}
                </p>
              </div>
              <div className='mt-2 flex'>
                <button
                  disabled={bookingItem.status === 'cancel'}
                  onClick={() => cancelBooking(booking.id)}
                  className={`text-red-600 border-2 border-red-600 w-1/2 mr-2 px-2 rounded-md transition duration-200 ease-linear ${
                    bookingItem.status === 'cancel'
                      ? 'cursor-not-allowed'
                      : 'hover:text-white hover:bg-red-600'
                  }`}
                >
                  {bookingItem.status === 'cancel'
                    ? 'Canceled'
                    : 'Cancel booking'}
                </button>
                <Link href={`/my-bookings/${booking.id}`} passHref>
                  <button className='text-green-700 border-2 border-green-700 w-1/2 px-2 rounded-md hover:text-white hover:bg-green-700 transition duration-200 ease-linear'>
                    Show details
                  </button>
                </Link>
              </div>
            </div>
            <div className='w-full md:w-[40%]'>
              <img
                src={event.photos[0].photo}
                alt={event.name}
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </article>
      ) : (
        //</Link>
        <div>Sorry no event</div>
      )}
    </>
  );
};

export default BookingEventListItem;
