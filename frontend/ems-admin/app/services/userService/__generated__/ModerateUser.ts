/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ModerateUser
// ====================================================

export interface ModerateUser_moderateUser {
  __typename: "User";
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  userPhoto: string | null;
}

export interface ModerateUser {
  moderateUser: ModerateUser_moderateUser;
}

export interface ModerateUserVariables {
  isActive: boolean;
  userId: string;
}
