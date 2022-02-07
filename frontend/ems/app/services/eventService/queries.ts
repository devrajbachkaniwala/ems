import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query EventsPage {
      events {
        id
        name
        description
        city
        state
        country
        venue
        category
        createdAt
        modifiedAt
        geoLatLng
      }
  } 
`;