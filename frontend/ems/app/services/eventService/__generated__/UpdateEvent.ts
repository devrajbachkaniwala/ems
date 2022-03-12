/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEventInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEvent
// ====================================================

export interface UpdateEvent_updateEventById {
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

export interface UpdateEvent {
  updateEventById: UpdateEvent_updateEventById;
}

export interface UpdateEventVariables {
  eventId: string;
  data: UpdateEventInput;
}
