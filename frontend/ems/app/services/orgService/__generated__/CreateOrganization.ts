/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddOrganizationInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrganization
// ====================================================

export interface CreateOrganization_createOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface CreateOrganization {
  createOrganization: CreateOrganization_createOrganization;
}

export interface CreateOrganizationVariables {
  data: AddOrganizationInput;
}
