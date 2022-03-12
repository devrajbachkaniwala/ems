/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddBookingInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BookEvent
// ====================================================

export interface BookEvent_addBooking {
  __typename: "Booking";
  id: string;
  createdAt: any;
  modifiedAt: any;
}

export interface BookEvent {
  addBooking: BookEvent_addBooking;
}

export interface BookEventVariables {
  data: AddBookingInput;
}
