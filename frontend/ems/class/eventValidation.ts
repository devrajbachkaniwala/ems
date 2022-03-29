import { dateString } from 'utils/dateString';

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
      throw new Error('Currency should be 3 characters');
    }

    return true;
  }

  static async date(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Date is required');
    }

    const currDate = dateString(new Date());
    if (new Date(currDate) >= new Date(value)) {
      throw new Error(
        `Date should be in future and not today's date nor the past`
      );
    }

    return true;
  }

  static async startTime(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('Start Time is required');
    }

    return true;
  }

  static async endTime(value: string): Promise<boolean> {
    if (!value.length) {
      throw new Error('End Time is required');
    }

    return true;
  }

  static async timeDifference(
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    if (!startTime.length) {
      throw new Error('Start Time is required');
    }
    const start = startTime.split(':');
    const end = endTime.split(':');

    const totalStartMinutes = +start[0] * 60 + +start[1];
    const totalEndMinutes = +end[0] * 60 + +end[1];
    const timeDifference = totalEndMinutes - totalStartMinutes;

    if (timeDifference < 60) {
      throw new Error(
        'Time difference of at least 1 hour is required between start and end time '
      );
    }

    return true;
  }
}
