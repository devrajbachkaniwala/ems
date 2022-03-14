import { UserProfile_user } from '@/services/authService/__generated__/UserProfile';
import { action, makeObservable, observable } from 'mobx';

class AuthStore {
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
}

export default new AuthStore();
