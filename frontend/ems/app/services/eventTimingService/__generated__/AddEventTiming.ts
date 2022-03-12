/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddEventTimingInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddEventTiming
// ====================================================

export interface AddEventTiming_addEventTimingByEventId {
  __typename: "EventTiming";
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface AddEventTiming {
  addEventTimingByEventId: AddEventTiming_addEventTimingByEventId;
}

export interface AddEventTimingVariables {
  data: AddEventTimingInput;
  eventId: string;
}
