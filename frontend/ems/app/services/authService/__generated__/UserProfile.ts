/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfile
// ====================================================

export interface UserProfile_user_organization {
  __typename: "Organization";
  id: string;
}

export interface UserProfile_user {
  __typename: "User";
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: any;
  modifiedAt: any;
  userPhoto: string | null;
  organization: UserProfile_user_organization | null;
}

export interface UserProfile {
  user: UserProfile_user;
}
