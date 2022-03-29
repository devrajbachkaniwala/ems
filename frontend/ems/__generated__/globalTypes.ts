/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddBookingInput {
  eventId: string;
  priceId: string;
  timingId: string;
  orgId: string;
  qty: number;
}

export interface AddEventInput {
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  geoLatLng: string;
}

export interface AddEventPriceInput {
  price: number;
  currency: string;
  maxLimit?: number | null;
}

export interface AddEventTimingInput {
  date: string;
  startTime: string;
  endTime: string;
}

export interface AddOrganizationInput {
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface AddReviewInput {
  description: string;
  star: number;
}

export interface UpdateEventInput {
  name?: string | null;
  description?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  venue?: string | null;
  category?: string | null;
  geoLatLng?: string | null;
}

export interface UpdateEventPriceInput {
  price?: number | null;
  currency?: string | null;
  maxLimit?: number | null;
}

export interface UpdateEventTimingInput {
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
}

export interface UpdateOrganizationInput {
  name?: string | null;
  description?: string | null;
  contactNo?: string | null;
  email?: string | null;
  photo?: string | null;
}

export interface UpdateReviewInput {
  description?: string | null;
  star?: number | null;
}

export interface UpdateUserInput {
  username?: string | null;
  userPhoto?: string | null;
  fullName?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
