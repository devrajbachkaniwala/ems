import reviewStore from 'components/eventReview/reviewStore';
import authStore from './authStore';
import { EventStore } from './eventStore';

export const store = {
  auth: authStore,
  review: reviewStore
};
