import { gql } from '@apollo/client';

export const CREATE_EVENT_PHOTO = gql`
  mutation AddEventPhoto($photo: String!, $eventId: ID!) {
    addEventPhotoByEventId(photo: $photo, eventId: $eventId) {
      id
      photo
    }
  }
`;

export const UPDATE_EVENT_PHOTO = gql`
  mutation UpdateEventPhoto($eventId: ID!, $photo: String!, $photoId: ID!) {
    updateEventPhotoById(eventId: $eventId, photo: $photo, photoId: $photoId) {
      id
      photo
    }
  }
`;

export const REMOVE_EVENT_PHOTO = gql`
  mutation RemoveEventPhoto($eventId: ID!, $photoId: ID!) {
    removeEventPhotoById(eventId: $eventId, photoId: $photoId)
  }
`;
