/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyEvents
// ====================================================

export interface MyEvents_organization_events_photos {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface MyEvents_organization_events_timings {
  __typename: "EventTiming";
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface MyEvents_organization_events_prices {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
  maxLimit: number;
  sold: number;
}

export interface MyEvents_organization_events {
  __typename: "Event";
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  photos: MyEvents_organization_events_photos[] | null;
  timings: MyEvents_organization_events_timings[] | null;
  prices: MyEvents_organization_events_prices[] | null;
}

export interface MyEvents_organization {
  __typename: "Organization";
  id: string;
  events: MyEvents_organization_events[] | null;
}

export interface MyEvents {
  organization: MyEvents_organization;
}
