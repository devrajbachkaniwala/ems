/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEventTimingInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEventTiming
// ====================================================

export interface UpdateEventTiming_updateEventTimingById {
  __typename: "EventTiming";
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface UpdateEventTiming {
  updateEventTimingById: UpdateEventTiming_updateEventTimingById;
}

export interface UpdateEventTimingVariables {
  eventId: string;
  data: UpdateEventTimingInput;
  timingId: string;
}
