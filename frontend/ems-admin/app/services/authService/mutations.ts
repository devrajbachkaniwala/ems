import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      username
      fullName
      email
      userPhoto
    }
  }
`;
