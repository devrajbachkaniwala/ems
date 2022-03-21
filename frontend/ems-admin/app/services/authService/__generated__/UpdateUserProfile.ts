/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserProfile
// ====================================================

export interface UpdateUserProfile_updateUser {
  __typename: "User";
  id: string;
  username: string;
  fullName: string;
  email: string;
  userPhoto: string | null;
}

export interface UpdateUserProfile {
  updateUser: UpdateUserProfile_updateUser;
}

export interface UpdateUserProfileVariables {
  data: UpdateUserInput;
}
