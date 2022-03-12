import { gql } from '@apollo/client';

export const CREATE_EVENT_TIMING = gql`
  mutation AddEventTiming($data: AddEventTimingInput!, $eventId: ID!) {
    addEventTimingByEventId(data: $data, eventId: $eventId) {
      id
      date
      startTime
      endTime
    }
  }
`;

export const UPDATE_EVENT_TIMING = gql`
  mutation UpdateEventTiming(
    $eventId: ID!
    $data: UpdateEventTimingInput!
    $timingId: ID!
  ) {
    updateEventTimingById(eventId: $eventId, data: $data, timingId: $timingId) {
      id
      date
      startTime
      endTime
    }
  }
`;

export const REMOVE_EVENT_TIMING = gql`
  mutation RemoveEventTiming($eventId: ID!, $timingId: ID!) {
    removeEventTimingById(eventId: $eventId, timingId: $timingId)
  }
`;
