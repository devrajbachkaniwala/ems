/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrganizationInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateOrganization
// ====================================================

export interface UpdateOrganization_updateOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
}

export interface UpdateOrganization {
  updateOrganization: UpdateOrganization_updateOrganization;
}

export interface UpdateOrganizationVariables {
  data: UpdateOrganizationInput;
}
