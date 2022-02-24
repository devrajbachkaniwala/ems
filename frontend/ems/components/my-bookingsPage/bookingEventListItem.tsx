import Link from 'next/link';
import { TMyBookings } from 'pages/my-bookings';
import { FC, MouseEventHandler } from 'react';

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
  booking: TMyBookings;
};

const BookingEventListItem: FC<TBookingEventListItemProps> = ({ booking }) => {
  const { event, bookingItem } = booking;
  const { qty, price, timing, organization } = bookingItem;

  const cancelBooking = () => {
    console.log(`booking id: ${booking.id}`);
  };

  return (
    /* Event item container */
    //<Link href={`/events/${event.id}`} passHref>
    <article className='flex flex-col flex-wrap my-6 max-w-[720px] bg-slate-100 rounded-md overflow-hidden hover:shadow-lg transition duration-200 ease-linear'>
      <div className='flex flex-col-reverse md:flex-row'>
        <div className='px-4 py-3 w-full md:w-[60%]'>
          <h2 className='text-lg text-slate-800 font-bold'>{event.name}</h2>
          <p className='text-orange-600 font-bold my-2'>
            {timing.date.toLocaleDateString()}
          </p>
          <p className='text-slate-600 text-sm'>{`${event.city}, ${event.state}`}</p>

          <div className='mt-2 text-slate-600 text-sm'>
            <p>Status {bookingItem.status}</p>
            <p>
              Booked {qty} of price {price.currency} {price.price}
            </p>
            <p className='font-semibold'>
              Paid {price.currency} {price.price * qty}
            </p>
          </div>
          <div className='mt-2 flex'>
            <button
              disabled={bookingItem.status === 'cancel'}
              onClick={cancelBooking}
              className='text-red-600 border-2 border-red-600 w-1/2 mr-2 px-2 rounded-md hover:text-white hover:bg-red-600 transition duration-200 ease-linear'
            >
              {bookingItem.status === 'cancel' ? 'Canceled' : 'Cancel booking'}
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
    //</Link>
  );
};

export default BookingEventListItem;
