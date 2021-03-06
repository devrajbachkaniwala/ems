import authService from '@/services/authService';
import {
  UserProfile,
  UserProfile_user
} from '@/services/authService/__generated__/UserProfile';
import { makeObservable, observable, action, runInAction } from 'mobx';
import { TTokens } from 'types/token';
import { TLoginUser } from 'types/user';
import tokenClass from 'class/Token';

class AuthStore {
  //loading: boolean = false;
  //user: UserProfile_user | null = null;
  //error: string | null = null;

  user: UserProfile_user | undefined = undefined;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action
    });
  }

  setUser(user: UserProfile_user | undefined) {
    this.user = user;
  }

  /* async loginUser(user: TLoginUser) {
    this.loading = true;
    this.user = null;
    try {
      const resToken: TTokens = await authService.loginUser(user);
      sessionStorage.setItem('accessToken', resToken.accessToken);
      localStorage.setItem('refreshToken', resToken.refreshToken);
      tokenClass.setAccessToken(resToken.accessToken);
      console.log(resToken);
      const resUser: UserProfile_user = await authService.getUserProfile();
      runInAction(() => {
        this.loading = false;
        this.user = resUser;
        this.error = null;
      });
    } catch (err: any) {
      runInAction(() => {
        this.loading = false;
        this.user = null;
        this.error = err.message;
      });
    }
  } */

  /*  async logout() {
    this.loading = true;
    try {
      const res = await authService.
    } catch (err: any) {}
  } */
}

export default new AuthStore();
