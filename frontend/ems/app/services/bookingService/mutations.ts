import { gql } from '@apollo/client';

export const BOOK_EVENT = gql`
  mutation BookEvent($data: AddBookingInput!) {
    addBooking(data: $data) {
      id
      createdAt
      modifiedAt
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId)
  }
`;
