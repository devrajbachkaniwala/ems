export class OrgValidation {
  static async orgName(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Name is required');
    }
    if (value.length < 5) {
      throw new Error('Name should be at least 5 characters');
    }

    if (value.length > 100) {
      throw new Error('Name should be less than or equal to 100 characters');
    }
    return true;
  }

  static async description(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Description is required');
    }
    if (value.length < 5) {
      throw new Error('Description should be at least 5 characters');
    }
    return true;
  }

  static async contactNo(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Contact number is required');
    }
    const regexp: RegExp = /^\d{10}$/;

    if (!regexp.test(value)) {
      throw new Error('Contact number should be 10 digits');
    }
    return true;
  }

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
}
