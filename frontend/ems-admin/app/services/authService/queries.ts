import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query UserProfile {
    user {
      id
      username
      fullName
      email
      userPhoto
      role
    }
  }
`;
