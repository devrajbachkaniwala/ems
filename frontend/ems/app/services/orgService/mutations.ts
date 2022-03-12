import { gql } from '@apollo/client';

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($data: AddOrganizationInput!) {
    createOrganization(data: $data) {
      id
      name
      description
      contactNo
      email
      photo
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($data: UpdateOrganizationInput!) {
    updateOrganization(data: $data) {
      id
      name
      description
      contactNo
      email
      photo
    }
  }
`;

export const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization {
    deleteOrganization
  }
`;

export const ADD_TEAM_MEMBER = gql`
  mutation AddTeamMember($email: String!) {
    addTeamMember(email: $email) {
      id
      user {
        id
        username
        fullName
        email
        userPhoto
      }
    }
  }
`;

export const REMOVE_TEAM_MEMBER = gql`
  mutation RemoveTeamMember($email: String!) {
    removeTeamMember(email: $email)
  }
`;
