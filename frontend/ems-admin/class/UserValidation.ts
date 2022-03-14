// Validation class to validate fields
export class UserValidation {
  // Email validator
  static async email(email: string): Promise<boolean> {
    const emailRegExp: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.length) {
      throw new Error('Email is required');
      //return { errMsg: 'Email is required' };
    }

    if (!emailRegExp.test(email)) {
      throw new Error('Invalid email');
      //return { errMsg: 'Invalid email' };
    }

    if (email.length > 150) {
      throw new Error('Email length should be less than or equal to 150');
      //return { errMsg: 'Email length should be less than or equal to 150' };
    }

    return true;
  }

  // Password validator
  static async password(password: string): Promise<boolean> {
    const passwordRegExp: RegExp = new RegExp(
      `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]).{8,20}$`,
      'g'
    );

    if (!password.length) {
      throw new Error('Password is required');
      //return { errMsg: 'Password is required' };
    }

    if (password.length < 8) {
      throw new Error('Password should be at least 8 characters');
      //return { errMsg: 'Password should be at least 8 characters' };
    }

    if (password.length > 20) {
      throw new Error('Password should be at most 20 characters');
      //return { errMsg: 'Password should be at most 20 characters' };
    }

    if (!passwordRegExp.test(password)) {
      throw new Error(
        'Password should contain uppercase, lowercase, digit, symbol'
      );
      //return { errMsg: 'Password should contain uppercase, lowercase, digit, symbol' };
    }

    return true;
  }

  // Username validator
  static async username(username: string): Promise<boolean> {
    const usernameRegExp: RegExp = /^\w{5,100}$/;

    if (!username.length) {
      throw new Error('Username is required');
      //return { errMsg: 'Username is required' }
    }

    if (username.length < 5) {
      throw new Error('Username should be at least 5 characters');
      //return { errMsg: 'Username should be at least 5 characters' }
    }

    if (username.length > 100) {
      throw new Error('Username should be at most 100 characters');
      //return { errMsg: 'Username should be at most 100 characters' }
    }

    if (!usernameRegExp.test(username)) {
      throw new Error(
        'Username can be uppercase, lowercase, digit or can contain underscore'
      );
      //return { errMsg: 'Username can be uppercase, lowercase, digit or can contain underscore' }
    }

    return true;
  }

  // FullName validator
  static async fullName(fullName: string): Promise<boolean> {
    const fullNameRegExp: RegExp = /^[a-zA-Z ]*$/;

    if (!fullName.length) {
      throw new Error('Full Name is required');
      //return { errMsg: 'Full Name is required' }
    }

    if (fullName.length < 5) {
      throw new Error('Full Name should be at least 5 characters');
      //return { errMsg: 'Full Name should be at least 5 characters' }
    }

    if (fullName.length > 100) {
      throw new Error('Full Name should be at most 100 characters');
      //return { errMsg: 'Full Name should be at most 100 characters' }
    }

    if (!fullNameRegExp.test(fullName)) {
      throw new Error('Full Name can be uppercase or lowercase');
      //return { errMsg: 'Full Name can be uppercase or lowercase' }
    }

    return true;
  }

  static async confirmPassword(
    confirmPasswd: string,
    passwd: string
  ): Promise<boolean> {
    if (!confirmPasswd.length) {
      throw new Error('Confirm Password is required');
    }

    if (confirmPasswd === passwd) {
      return true;
    } else {
      throw new Error('Confirm Password does not match Password');
    }
  }
}
