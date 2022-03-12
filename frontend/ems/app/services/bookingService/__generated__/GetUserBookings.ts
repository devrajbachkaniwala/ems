/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserBookings
// ====================================================

export interface GetUserBookings_myBookings_event_photos {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface GetUserBookings_myBookings_event {
  __typename: "Event";
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  photos: GetUserBookings_myBookings_event_photos[] | null;
}

export interface GetUserBookings_myBookings_bookingItem_price {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
}

export interface GetUserBookings_myBookings_bookingItem_organization {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface GetUserBookings_myBookings_bookingItem_timing {
  __typename: "EventTiming";
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface GetUserBookings_myBookings_bookingItem {
  __typename: "BookingItem";
  id: string;
  qty: number;
  status: string;
  price: GetUserBookings_myBookings_bookingItem_price;
  organization: GetUserBookings_myBookings_bookingItem_organization;
  timing: GetUserBookings_myBookings_bookingItem_timing;
}

export interface GetUserBookings_myBookings {
  __typename: "Booking";
  id: string;
  createdAt: any;
  modifiedAt: any;
  event: GetUserBookings_myBookings_event;
  bookingItem: GetUserBookings_myBookings_bookingItem;
}

export interface GetUserBookings {
  myBookings: GetUserBookings_myBookings[] | null;
}
