/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizationById
// ====================================================

export interface GetOrganizationById_getOrganizationById {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface GetOrganizationById {
  getOrganizationById: GetOrganizationById_getOrganizationById;
}

export interface GetOrganizationByIdVariables {
  orgId: string;
}
