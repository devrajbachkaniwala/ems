/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetail
// ====================================================

export interface UserDetail_userById_bookings_event_photos {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface UserDetail_userById_bookings_event {
  __typename: "Event";
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  photos: UserDetail_userById_bookings_event_photos[] | null;
}

export interface UserDetail_userById_bookings_bookingItem_price {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
}

export interface UserDetail_userById_bookings_bookingItem_timing {
  __typename: "EventTiming";
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface UserDetail_userById_bookings_bookingItem_organization {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface UserDetail_userById_bookings_bookingItem {
  __typename: "BookingItem";
  id: string;
  qty: number;
  status: string;
  price: UserDetail_userById_bookings_bookingItem_price;
  timing: UserDetail_userById_bookings_bookingItem_timing;
  organization: UserDetail_userById_bookings_bookingItem_organization;
}

export interface UserDetail_userById_bookings {
  __typename: "Booking";
  id: string;
  createdAt: any;
  modifiedAt: any;
  event: UserDetail_userById_bookings_event;
  bookingItem: UserDetail_userById_bookings_bookingItem;
}

export interface UserDetail_userById {
  __typename: "User";
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: any;
  modifiedAt: any;
  userPhoto: string | null;
  bookings: UserDetail_userById_bookings[] | null;
}

export interface UserDetail {
  userById: UserDetail_userById | null;
}

export interface UserDetailVariables {
  userId: string;
}
