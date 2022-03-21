import { gql } from '@apollo/client';

export const Event_List = gql`
  query EventList {
    events {
      id
      name
      city
      state
      country
      category
      organization {
        id
        name
      }
      photos {
        id
        photo
      }
      timings {
        id
        date
      }
      prices {
        id
        price
        currency
      }
    }
  }
`;

export const EVENT_DETAIL = gql`
  query EventDetail($eventId: ID!) {
    eventById(eventId: $eventId) {
      id
      name
      description
      city
      state
      country
      venue
      category
      geoLatLng
      photos {
        id
        photo
      }
      timings {
        id
        date
        startTime
        endTime
      }
      prices {
        id
        price
        currency
        maxLimit
        sold
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
`;

export const MY_EVENTS = gql`
  query MyEvents {
    organization {
      id
      events {
        id
        name
        city
        state
        country
        venue
        category
        photos {
          id
          photo
        }
        timings {
          id
          date
          startTime
          endTime
        }
        prices {
          id
          price
          currency
          maxLimit
          sold
        }
      }
    }
  }
`;
