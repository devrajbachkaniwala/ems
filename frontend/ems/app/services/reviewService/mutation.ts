import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation AddReview($data: AddReviewInput!, $eventId: ID!) {
    addReviewByEventId(data: $data, eventId: $eventId) {
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

export const UPDATE_REVIEW = gql`
  mutation UpdateReview(
    $eventId: ID!
    $data: UpdateReviewInput!
    $reviewId: ID!
  ) {
    updateReviewById(eventId: $eventId, data: $data, reviewId: $reviewId) {
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

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($eventId: ID!, $reviewId: ID!) {
    removeReviewById(eventId: $eventId, reviewId: $reviewId)
  }
`;
