import { apolloClient } from 'app/graphql';
import {
  AddEventPriceInput,
  UpdateEventPriceInput
} from '__generated__/globalTypes';
import {
  CREATE_EVENT_PRICE,
  REMOVE_EVENT_PRICE,
  UPDATE_EVENT_PRICE
} from './mutations';
import {
  AddEventPrice,
  AddEventPriceVariables
} from './__generated__/AddEventPrice';
import {
  RemoveEventPrice,
  RemoveEventPriceVariables
} from './__generated__/RemoveEventPrice';
import {
  UpdateEventPrice,
  UpdateEventPriceVariables
} from './__generated__/UpdateEventPrice';

class EventPriceService {
  async addEventPriceByEventId(eventId: string, data: AddEventPriceInput) {
    try {
      const res = await apolloClient.mutate<
        AddEventPrice,
        AddEventPriceVariables
      >({ mutation: CREATE_EVENT_PRICE, variables: { data, eventId } });

      if (!res || !res.data || !res.data.addEventPriceByEventId) {
        throw new Error('Failed to create event price');
      }
      return res.data.addEventPriceByEventId;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  async updateEventPriceById(
    eventId: string,
    priceId: string,
    data: UpdateEventPriceInput
  ) {
    try {
      const res = await apolloClient.mutate<
        UpdateEventPrice,
        UpdateEventPriceVariables
      >({
        mutation: UPDATE_EVENT_PRICE,
        variables: { eventId, priceId, data }
      });

      if (!res || !res.data || !res.data.updateEventPriceById) {
        throw new Error('Failed to update event price');
      }
      return res.data.updateEventPriceById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  async removeEventPriceById(eventId: string, priceId: string) {
    try {
      const res = await apolloClient.mutate<
        RemoveEventPrice,
        RemoveEventPriceVariables
      >({
        mutation: REMOVE_EVENT_PRICE,
        variables: { eventId, priceId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to remove event price');
      }
      return res.data.removeEventPriceById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }
}

export default new EventPriceService();
