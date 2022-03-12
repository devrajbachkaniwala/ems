/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BookingDetail
// ====================================================

export interface BookingDetail_bookingById_event_photos {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface BookingDetail_bookingById_event {
  __typename: "Event";
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  photos: BookingDetail_bookingById_event_photos[] | null;
}

export interface BookingDetail_bookingById_bookingItem_price {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
}

export interface BookingDetail_bookingById_bookingItem_organization {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface BookingDetail_bookingById_bookingItem_timing {
  __typename: "EventTiming";
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface BookingDetail_bookingById_bookingItem {
  __typename: "BookingItem";
  id: string;
  qty: number;
  status: string;
  price: BookingDetail_bookingById_bookingItem_price;
  organization: BookingDetail_bookingById_bookingItem_organization;
  timing: BookingDetail_bookingById_bookingItem_timing;
}

export interface BookingDetail_bookingById {
  __typename: "Booking";
  id: string;
  event: BookingDetail_bookingById_event;
  bookingItem: BookingDetail_bookingById_bookingItem;
}

export interface BookingDetail {
  bookingById: BookingDetail_bookingById | null;
}

export interface BookingDetailVariables {
  bookingId: string;
}
