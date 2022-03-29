/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddReviewInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddReview
// ====================================================

export interface AddReview_addReviewByEventId_user {
  __typename: "User";
  id: string;
  username: string;
  userPhoto: string | null;
}

export interface AddReview_addReviewByEventId {
  __typename: "Review";
  id: string;
  description: string;
  star: number;
  user: AddReview_addReviewByEventId_user;
}

export interface AddReview {
  addReviewByEventId: AddReview_addReviewByEventId;
}

export interface AddReviewVariables {
  data: AddReviewInput;
  eventId: string;
}
