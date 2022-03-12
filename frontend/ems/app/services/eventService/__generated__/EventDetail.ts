/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventDetail
// ====================================================

export interface EventDetail_eventById_photos {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface EventDetail_eventById_timings {
  __typename: "EventTiming";
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface EventDetail_eventById_prices {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
  maxLimit: number;
  sold: number;
}

export interface EventDetail_eventById_organization {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface EventDetail_eventById {
  __typename: "Event";
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  geoLatLng: string;
  photos: EventDetail_eventById_photos[] | null;
  timings: EventDetail_eventById_timings[] | null;
  prices: EventDetail_eventById_prices[] | null;
  organization: EventDetail_eventById_organization;
}

export interface EventDetail {
  eventById: EventDetail_eventById | null;
}

export interface EventDetailVariables {
  eventId: string;
}
