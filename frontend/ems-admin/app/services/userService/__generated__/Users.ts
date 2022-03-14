/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users {
  __typename: "User";
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  userPhoto: string | null;
}

export interface Users {
  users: Users_users[];
}
