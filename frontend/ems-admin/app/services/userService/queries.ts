import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users {
    users {
      id
      username
      fullName
      email
      role
      isActive
      userPhoto
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query UserDetail($userId: ID!) {
    userById(userId: $userId) {
      id
      username
      fullName
      email
      role
      isActive
      createdAt
      modifiedAt
      userPhoto
      bookings {
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
          timing {
            id
            date
            startTime
            endTime
          }
          organization {
            id
            name
            description
            contactNo
            email
            photo
          }
        }
      }
    }
  }
`;
