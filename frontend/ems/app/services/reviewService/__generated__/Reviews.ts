/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Reviews
// ====================================================

export interface Reviews_reviewsByEventId_user {
  __typename: "User";
  id: string;
  username: string;
  userPhoto: string | null;
}

export interface Reviews_reviewsByEventId {
  __typename: "Review";
  id: string;
  description: string;
  star: number;
  user: Reviews_reviewsByEventId_user;
}

export interface Reviews {
  reviewsByEventId: Reviews_reviewsByEventId[] | null;
}

export interface ReviewsVariables {
  eventId: string;
}
