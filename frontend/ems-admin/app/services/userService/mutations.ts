import { gql } from '@apollo/client';

export const MODERATE_USER = gql`
  mutation ModerateUser($isActive: Boolean!, $userId: ID!) {
    moderateUser(isActive: $isActive, id: $userId) {
      id
      username
      fullName
      email
      role
      isActive
      userPhoto
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUserById(id: $userId)
  }
`;
