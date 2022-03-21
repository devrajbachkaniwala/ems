export class EventValidation {
  static async eventName(value: string): Promise<boolean> {
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

  static async city(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('City is required');
    }

    if (value.length < 3) {
      throw new Error('City should be at least 3 characters');
    }

    if (value.length > 85) {
      throw new Error('City should be less than or equal to 85 characters');
    }

    return true;
  }

  static async state(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('State is required');
    }

    if (value.length < 3) {
      throw new Error('State should be at least 3 characters');
    }

    if (value.length > 15) {
      throw new Error('State should be less than or equal to 15 characters');
    }

    return true;
  }

  static async country(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Country is required');
    }

    if (value.length < 3) {
      throw new Error('Country should be at least 3 characters');
    }

    if (value.length > 56) {
      throw new Error('Country should be less than or equal to 56 characters');
    }

    return true;
  }

  static async venue(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Venue is required');
    }

    if (value.length < 3) {
      throw new Error('Venue should be at least 3 characters');
    }

    return true;
  }

  static async category(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Category is required');
    }

    if (value.length < 3) {
      throw new Error('Category should be at least 3 characters');
    }

    if (value.length > 50) {
      throw new Error('Category should be less than or equal to 50 characters');
    }

    return true;
  }

  static async currency(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Currency is required');
    }

    if (value.length < 3) {
      throw new Error('Currency should be at least 3 characters');
    }

    return true;
  }
}
