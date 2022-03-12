/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganization
// ====================================================

export interface GetOrganization_organization {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface GetOrganization {
  organization: GetOrganization_organization;
}
