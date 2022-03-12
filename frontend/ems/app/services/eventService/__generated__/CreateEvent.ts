/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddEventInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEvent
// ====================================================

export interface CreateEvent_createEvent {
  __typename: "Event";
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
}

export interface CreateEvent {
  createEvent: CreateEvent_createEvent;
}

export interface CreateEventVariables {
  data: AddEventInput;
}
