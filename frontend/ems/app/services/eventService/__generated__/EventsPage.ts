/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventsPage
// ====================================================

export interface EventsPage_events {
  __typename: "Event";
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  createdAt: any;
  modifiedAt: any;
  geoLatLng: string;
}

export interface EventsPage {
  events: EventsPage_events[] | null;
}
