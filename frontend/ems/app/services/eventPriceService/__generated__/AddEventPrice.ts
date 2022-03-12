/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddEventPriceInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddEventPrice
// ====================================================

export interface AddEventPrice_addEventPriceByEventId {
  __typename: "EventPrice";
  id: string;
  price: number;
  currency: string;
  maxLimit: number;
}

export interface AddEventPrice {
  addEventPriceByEventId: AddEventPrice_addEventPriceByEventId;
}

export interface AddEventPriceVariables {
  data: AddEventPriceInput;
  eventId: string;
}
