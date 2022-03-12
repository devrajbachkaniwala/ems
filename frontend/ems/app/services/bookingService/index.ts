import { apolloClient } from 'app/graphql';
import { AddBookingInput } from '__generated__/globalTypes';
import { BOOK_EVENT, CANCEL_BOOKING } from './mutations';
import { BOOKING_DETAIL, GET_USER_BOOKINGS } from './queries';
import { BookEvent, BookEventVariables } from './__generated__/BookEvent';
import {
  BookingDetail,
  BookingDetailVariables
} from './__generated__/BookingDetail';
import {
  CancelBooking,
  CancelBookingVariables
} from './__generated__/CancelBooking';
import { GetUserBookings } from './__generated__/GetUserBookings';

class BookingService {
  async getUserBookings() {
    try {
      const res = await apolloClient.query<GetUserBookings>({
        query: GET_USER_BOOKINGS
      });

      if (!res || !res.data) {
        throw new Error('Bookings not found');
      }

      return res.data.myBookings;
    } catch (err: any) {
      console.log(err);
    }
  }

  async bookEvent(data: AddBookingInput) {
    try {
      const res = await apolloClient.mutate<BookEvent, BookEventVariables>({
        mutation: BOOK_EVENT,
        variables: { data }
      });

      if (!res || !res.data) {
        throw new Error('Failed to book an event');
      }

      return res.data.addBooking;
    } catch (err: any) {
      console.log(err);
    }
  }

  async cancelBooking(bookingId: string) {
    try {
      const res = await apolloClient.mutate<
        CancelBooking,
        CancelBookingVariables
      >({
        mutation: CANCEL_BOOKING,
        variables: { bookingId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to cancel a booking');
      }

      return res.data.cancelBooking;
    } catch (err: any) {
      console.log(err);
    }
  }

  async getBookingById(bookingId: string) {
    try {
      const res = await apolloClient.query<
        BookingDetail,
        BookingDetailVariables
      >({
        query: BOOKING_DETAIL,
        variables: { bookingId }
      });

      if (!res || !res.data) {
        throw new Error('Booking not found');
      }

      return res.data.bookingById;
    } catch (err: any) {
      console.log(err);
    }
  }
}

export default new BookingService();
