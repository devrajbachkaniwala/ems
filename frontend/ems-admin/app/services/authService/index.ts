import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from 'app/graphql';
import axios, { AxiosResponse } from 'axios';
import { Env } from 'class/Env';
import { UpdateUserInput } from '__generated__/globalTypes';
import { UPDATE_USER_PROFILE } from './mutations';
import { GET_USER_PROFILE } from './queries';
import { TAccessToken, TLoginUser, TTokens } from './types';
import {
  UpdateUserProfile,
  UpdateUserProfileVariables
} from './__generated__/UpdateUserProfile';
import { UserProfile } from './__generated__/UserProfile';

class AuthService {
  async loginUser(user: TLoginUser): Promise<TTokens> {
    try {
      const res: AxiosResponse<TTokens> = await axios.post<
        TTokens,
        AxiosResponse<TTokens>,
        TLoginUser
      >(`${Env.authUrl}/login`, user);

      /*  localStorage.setItem('rToken', res.data.refreshToken);
      sessionStorage.setItem('aToken', res.data.accessToken); */

      return res.data;
    } catch (err: any) {
      if (err.response.data.errorCode && err.response.data.message) {
        throw new Error(
          `${err.response.data.errorCode}: ${err.response.data.message}`
        );
      }
      throw err;
    }
  }

  async getNewAccessToken(refreshToken: string): Promise<TAccessToken> {
    try {
      const res: AxiosResponse<TAccessToken> = await axios.post<
        TAccessToken,
        AxiosResponse<TAccessToken>
      >(`${Env.authUrl}/token`, null, {
        headers: {
          authorization: `Bearer ${refreshToken}`
        }
      });

      /*  localStorage.setItem('rToken', res.data.refreshToken);
      sessionStorage.setItem('aToken', res.data.accessToken); */

      return res.data;
    } catch (err: any) {
      if (err.response.data.errorCode && err.response.data.message) {
        throw new Error(
          `${err.response.data.errorCode}: ${err.response.data.message}`
        );
      }
      throw err;
    }
  }

  async getUserProfile(): Promise<UserProfile['user']> {
    try {
      const res: ApolloQueryResult<UserProfile> =
        await apolloClient.query<UserProfile>({ query: GET_USER_PROFILE });

      if (!res || !res.data) {
        throw new Error('user not found');
      }

      return res.data.user;
    } catch (err: any) {
      throw err;
    }
  }

  async updateUserProfile(
    data: UpdateUserInput
  ): Promise<UpdateUserProfile['updateUser']> {
    try {
      const res = await apolloClient.mutate<
        UpdateUserProfile,
        UpdateUserProfileVariables
      >({ mutation: UPDATE_USER_PROFILE, variables: { data } });

      if (!res || !res.data) {
        throw new Error('user not found');
      }

      return res.data.updateUser;
    } catch (err: any) {
      throw err;
    }
  }

  async logout(refreshToken: string): Promise<boolean> {
    try {
      const res = await axios.post(`${Env.authUrl}/logout`, null, {
        headers: { authorization: `Bearer ${refreshToken}` }
      });

      return res.status === 204 ? true : false;
    } catch (err: any) {
      if (err.response.data.errorCode && err.response.data.message) {
        throw new Error(
          `${err.response.data.errorCode}: ${err.response.data.message}`
        );
      }
      throw err;
    }
  }
}

export default new AuthService();
