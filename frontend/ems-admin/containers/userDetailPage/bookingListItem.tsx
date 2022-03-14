/* eslint-disable @next/next/no-img-element */
import { UserDetail_userById_bookings } from '@/services/userService/__generated__/UserDetail';
import Link from 'next/link';
import { FC } from 'react';
import { dateFormatter } from 'utils/dateFormatter';

type TBookingListItemProps = {
  booking: UserDetail_userById_bookings;
};

const BookingListItem: FC<TBookingListItemProps> = ({ booking }) => {
  const { event, bookingItem } = booking;
  const { price, qty, status, timing } = bookingItem;

  return (
    <article className='flex flex-col flex-wrap my-6 max-w-[720px] bg-slate-100 rounded-md overflow-hidden hover:shadow-lg transition duration-200 ease-linear'>
      <div className='flex flex-col-reverse md:flex-row'>
        <div className='px-4 py-3 w-full md:w-[60%]'>
          <h2 className='text-lg text-slate-800 font-bold'>{event.name}</h2>
          <p className='text-orange-600 font-bold my-2'>
            {dateFormatter(new Date(timing.date))}
          </p>
          <p className='text-slate-600 text-sm'>{`${event.city}, ${event.state}`}</p>

          <div className='mt-2 text-slate-600 text-sm'>
            <p>Status {status}</p>
            <p>
              Booked {qty} of price {price.currency} {price.price}
            </p>
            <p className='font-semibold'>
              Paid {price.currency} {price.price * qty}
            </p>
          </div>
        </div>
        <div className='w-full md:w-[40%]'>
          {event.photos?.length ? (
            <img
              src={event.photos[0].photo}
              alt={event.name}
              className='h-full w-full object-cover'
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </article>
  );
};

export default BookingListItem;
