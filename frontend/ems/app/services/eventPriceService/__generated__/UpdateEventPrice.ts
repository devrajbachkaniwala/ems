/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEventPriceInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEventPrice
// ====================================================

export interface UpdateEventPrice_updateEventPriceById {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
  maxLimit: number;
}

export interface UpdateEventPrice {
  updateEventPriceById: UpdateEventPrice_updateEventPriceById;
}

export interface UpdateEventPriceVariables {
  eventId: string;
  data: UpdateEventPriceInput;
  priceId: string;
}
