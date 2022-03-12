/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTeamMember
// ====================================================

export interface AddTeamMember_addTeamMember_user {
  __typename: "User";
  id: string;
  username: string;
  fullName: string;
  email: string;
  userPhoto: string | null;
}

export interface AddTeamMember_addTeamMember {
  __typename: "OrganizationTeamMember";
  id: string;
  user: AddTeamMember_addTeamMember_user | null;
}

export interface AddTeamMember {
  addTeamMember: AddTeamMember_addTeamMember;
}

export interface AddTeamMemberVariables {
  email: string;
}
