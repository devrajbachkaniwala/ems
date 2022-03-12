import { gql } from '@apollo/client';

export const CREATE_EVENT_PRICE = gql`
  mutation AddEventPrice($data: AddEventPriceInput!, $eventId: ID!) {
    addEventPriceByEventId(data: $data, eventId: $eventId) {
      id
      price
      currency
      maxLimit
    }
  }
`;

export const UPDATE_EVENT_PRICE = gql`
  mutation UpdateEventPrice(
    $eventId: ID!
    $data: UpdateEventPriceInput!
    $priceId: ID!
  ) {
    updateEventPriceById(eventId: $eventId, data: $data, priceId: $priceId) {
      id
      price
      currency
      maxLimit
    }
  }
`;

export const REMOVE_EVENT_PRICE = gql`
  mutation RemoveEventPrice($eventId: ID!, $priceId: ID!) {
    removeEventPriceById(eventId: $eventId, priceId: $priceId)
  }
`;
