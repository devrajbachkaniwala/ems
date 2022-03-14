import { apolloClient } from 'app/graphql';
import { DELETE_USER, MODERATE_USER } from './mutations';
import { GET_USERS, GET_USER_DETAIL } from './queries';
import { DeleteUser, DeleteUserVariables } from './__generated__/DeleteUser';
import {
  ModerateUser,
  ModerateUserVariables
} from './__generated__/ModerateUser';
import { UserDetail, UserDetailVariables } from './__generated__/UserDetail';
import { Users } from './__generated__/Users';

class UserService {
  async getUsers() {
    try {
      const res = await apolloClient.query<Users>({ query: GET_USERS });

      if (!res || !res.data) {
        throw new Error('No Users');
      }
      return res.data.users;
    } catch (err: any) {
      throw err;
    }
  }

  async moderateUserById(userId: string, isActive: boolean) {
    try {
      const res = await apolloClient.mutate<
        ModerateUser,
        ModerateUserVariables
      >({ mutation: MODERATE_USER, variables: { userId, isActive } });

      if (!res || !res.data) {
        throw new Error('Failed to moderate user');
      }
      return res.data.moderateUser;
    } catch (err: any) {
      throw err;
    }
  }

  async deleteUserById(userId: string) {
    try {
      const res = await apolloClient.mutate<DeleteUser, DeleteUserVariables>({
        mutation: DELETE_USER,
        variables: { userId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to delete a user');
      }
      return res.data.deleteUserById;
    } catch (err: any) {
      throw err;
    }
  }

  async getUserById(userId: string) {
    try {
      const res = await apolloClient.query<UserDetail, UserDetailVariables>({
        query: GET_USER_DETAIL,
        variables: { userId }
      });

      if (!res || !res.data) {
        throw new Error('User not found');
      }
      return res.data.userById;
    } catch (err: any) {
      throw err;
    }
  }
}

export default new UserService();
