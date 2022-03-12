import { GetUserBookings } from '@/services/bookingService/__generated__/GetUserBookings';
import { TMyBooking } from 'pages/my-bookings';
import { FC, ReactNode } from 'react';
import BookingEventListItem from './bookingEventListItem';

type TMyBookings = {
  myBookings: GetUserBookings['myBookings'];
  cancelBooking: (bookingId: string) => Promise<void>;
};

type TActiveBookings = TMyBookings & {
  isActive: boolean;
  isCanceled?: never;
};

type TCanceledBookings = TMyBookings & {
  isCanceled: boolean;
  isActive?: never;
};

type TBookingEventListsProps = TActiveBookings | TCanceledBookings;

const BookingEventLists: FC<TBookingEventListsProps> = (props) => {
  const { myBookings, cancelBooking } = props;
  return (
    <div className='w-4/5 mx-auto text-slate-700 flex flex-col justify-center items-center'>
      {/* Event Lists container */}
      <h2 className='mt-4 font-semibold'>
        {props.isActive ? 'Active Bookings' : 'Canceled Bookings'}
      </h2>

      <div className='my-4'>
        {myBookings?.length ? (
          <>
            {myBookings.map((booking) => (
              <BookingEventListItem
                key={booking.id}
                booking={booking}
                cancelBooking={cancelBooking}
              />
            ))}
          </>
        ) : props.isActive ? (
          <div>No Active Bookings</div>
        ) : (
          <div>No Canceled Bookings</div>
        )}
      </div>
    </div>
  );
};

export default BookingEventLists;
