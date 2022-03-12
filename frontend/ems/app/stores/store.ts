import { AuthStore } from './authStore';
import { EventStore } from './eventStore';

export const store = {
  auth: new AuthStore(),
  event: new EventStore()
};
