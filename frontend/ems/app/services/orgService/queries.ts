import { gql } from '@apollo/client';

export const GET_ORGANIZATION = gql`
  query GetOrganization {
    organization {
      id
      name
      description
      contactNo
      email
      photo
    }
  }
`;

export const GET_ORGANIZATION_BY_ID = gql`
  query GetOrganizationById($orgId: ID!) {
    getOrganizationById(orgId: $orgId) {
      id
      name
      description
      contactNo
      email
      photo
    }
  }
`;

export const GET_ORG_TEAM_MEMBERS = gql`
  query OrganizationTeamMembers {
    organization {
      id
      teamMembers {
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
  }
`;
