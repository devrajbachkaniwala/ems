/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateReviewInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReview
// ====================================================

export interface UpdateReview_updateReviewById_user {
  __typename: "User";
  id: string;
  username: string;
  userPhoto: string | null;
}

export interface UpdateReview_updateReviewById {
  __typename: "Review";
  id: string;
  description: string;
  star: number;
  user: UpdateReview_updateReviewById_user;
}

export interface UpdateReview {
  updateReviewById: UpdateReview_updateReviewById;
}

export interface UpdateReviewVariables {
  eventId: string;
  data: UpdateReviewInput;
  reviewId: string;
}
