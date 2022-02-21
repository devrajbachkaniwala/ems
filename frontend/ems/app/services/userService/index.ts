import axios, { AxiosResponse } from 'axios';
import { TRegisterUser, TUser, TLoginUser } from 'types/user';
import { TTokens } from 'types/token';
import { Env } from 'class/Env';
import { apolloClient } from 'app/graphql';
import { GET_USER_PROFILE } from './queries';
import { ApolloQueryResult } from '@apollo/client';
import { IUserProfile } from './types';

class UserService {
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

      localStorage.setItem('rToken', res.data.refreshToken);
      sessionStorage.setItem('aToken', res.data.accessToken);

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

      if (!res || !res.data) {
        throw new Error('user not found');
      }

      return res.data.user;
    } catch (err: any) {
      throw err;
    }
  }
}

export default new UserService();
