import { gql } from '@apollo/client';

export const GET_USER_BOOKINGS = gql`
  query GetUserBookings {
    myBookings {
      id
      createdAt
      modifiedAt
      event {
        id
        name
        description
        city
        state
        country
        venue
        category
        photos {
          id
          photo
        }
      }
      bookingItem {
        id
        qty
        status
        price {
          id
          price
          currency
        }
        organization {
          id
          name
          description
          contactNo
          email
          photo
        }
        timing {
          id
          date
          startTime
          endTime
        }
      }
    }
  }
`;

export const BOOKING_DETAIL = gql`
  query BookingDetail($bookingId: ID!) {
    bookingById(bookingId: $bookingId) {
      id
      event {
        id
        name
        description
        city
        state
        country
        venue
        category
        photos {
          id
          photo
        }
      }
      bookingItem {
        id
        qty
        status
        price {
          id
          price
          currency
        }
        organization {
          id
          name
          description
          contactNo
          email
          photo
        }
        timing {
          id
          date
          startTime
          endTime
        }
      }
    }
  }
`;
