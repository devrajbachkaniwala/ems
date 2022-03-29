import { gql } from '@apollo/client';

export const GET_REVIEWS = gql`
  query Reviews($eventId: ID!) {
    reviewsByEventId(eventId: $eventId) {
      id
      description
      star
      user {
        id
        username
        userPhoto
      }
    }
  }
`;
