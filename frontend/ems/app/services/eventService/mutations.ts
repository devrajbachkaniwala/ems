import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent($data: AddEventInput!) {
    createEvent(data: $data) {
      id
      name
      description
      city
      state
      country
      venue
      category
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($eventId: ID!, $data: UpdateEventInput!) {
    updateEventById(eventId: $eventId, data: $data) {
      id
      name
      description
      city
      state
      country
      venue
      category
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: ID!) {
    deleteEventById(eventId: $eventId)
  }
`;
