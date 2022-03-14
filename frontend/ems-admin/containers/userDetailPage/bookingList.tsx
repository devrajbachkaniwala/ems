import { UserDetail_userById_bookings } from '@/services/userService/__generated__/UserDetail';
import { FC } from 'react';
import BookingListItem from './bookingListItem';

type TBookingListProps = {
  bookings: UserDetail_userById_bookings[];
};

const BookingList: FC<TBookingListProps> = ({ bookings }) => {
  return (
    <section>
      {bookings.map((booking) => {
        return <BookingListItem key={booking.id} booking={booking} />;
      })}
    </section>
  );
};

export default BookingList;
