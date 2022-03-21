import axios, { AxiosResponse } from 'axios';
import { TRegisterUser, TUser, TLoginUser } from 'types/user';
import { TAccessToken, TTokens } from 'types/token';
import { Env } from 'class/Env';
import { apolloClient } from 'app/graphql';
import { GET_USER_PROFILE } from './queries';
import { ApolloQueryResult } from '@apollo/client';
import { IUserProfile } from './types';
import {
  UpdateUserProfile,
  UpdateUserProfileVariables
} from './__generated__/UpdateUserProfile';
import { UPDATE_USER_PROFILE } from './mutations';
import { UpdateUserInput } from '__generated__/globalTypes';

class authService {
  async registerUser(user: TRegisterUser): Promise<TUser> {
    try {
      const res: AxiosResponse<TUser> = await axios.post<
        TUser,
        AxiosResponse<TUser>,
        TRegisterUser
      >(`${Env.authUrl}/register`, user);

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

  async loginUser(user: TLoginUser): Promise<TTokens> {
    try {
      const res: AxiosResponse<TTokens> = await axios.post<
        TTokens,
        AxiosResponse<TTokens>,
        TLoginUser
      >(`${Env.authUrl}/login`, user);

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

  async getUserProfile(): Promise<IUserProfile['user']> {
    try {
      const res: ApolloQueryResult<IUserProfile> =
        await apolloClient.query<IUserProfile>({ query: GET_USER_PROFILE });

      if (!res || !res.data || !res.data.user) {
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

  async logout(refreshToken: string): Promise<boolean> {
    try {
      const res = await axios.post(`${Env.authUrl}/logout`, null, {
        headers: {
          authorization: `Bearer ${refreshToken}`
        }
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

export default new authService();
