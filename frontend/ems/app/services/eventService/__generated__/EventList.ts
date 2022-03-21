/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventList
// ====================================================

export interface EventList_events_organization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface EventList_events_photos {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface EventList_events_timings {
  __typename: "EventTiming";
  id: string;
  date: string;
}

export interface EventList_events_prices {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
}

export interface EventList_events {
  __typename: "Event";
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  category: string;
  organization: EventList_events_organization;
  photos: EventList_events_photos[] | null;
  timings: EventList_events_timings[] | null;
  prices: EventList_events_prices[] | null;
}

export interface EventList {
  events: EventList_events[] | null;
}
