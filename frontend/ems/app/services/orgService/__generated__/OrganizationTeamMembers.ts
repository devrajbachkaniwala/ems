/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationTeamMembers
// ====================================================

export interface OrganizationTeamMembers_organization_teamMembers_user {
  __typename: "User";
  id: string;
  username: string;
  fullName: string;
  email: string;
  userPhoto: string | null;
}

export interface OrganizationTeamMembers_organization_teamMembers {
  __typename: "OrganizationTeamMember";
  id: string;
  user: OrganizationTeamMembers_organization_teamMembers_user | null;
}

export interface OrganizationTeamMembers_organization {
  __typename: "Organization";
  id: string;
  teamMembers: OrganizationTeamMembers_organization_teamMembers[] | null;
}

export interface OrganizationTeamMembers {
  organization: OrganizationTeamMembers_organization;
}
