import { apolloClient } from 'app/graphql';
import {
  AddEventTimingInput,
  UpdateEventTimingInput
} from '__generated__/globalTypes';
import {
  CREATE_EVENT_TIMING,
  REMOVE_EVENT_TIMING,
  UPDATE_EVENT_TIMING
} from './mutations';
import {
  AddEventTiming,
  AddEventTimingVariables
} from './__generated__/AddEventTiming';
import {
  RemoveEventTiming,
  RemoveEventTimingVariables
} from './__generated__/RemoveEventTiming';
import {
  UpdateEventTiming,
  UpdateEventTimingVariables
} from './__generated__/UpdateEventTiming';

class EventTimingService {
  async addEventTimingByEventId(eventId: string, data: AddEventTimingInput) {
    try {
      const res = await apolloClient.mutate<
        AddEventTiming,
        AddEventTimingVariables
      >({ mutation: CREATE_EVENT_TIMING, variables: { data, eventId } });

      if (!res || !res.data || !res.data.addEventTimingByEventId) {
        throw new Error('Failed to create event timing');
      }
      return res.data.addEventTimingByEventId;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  async updateEventTimingById(
    eventId: string,
    timingId: string,
    data: UpdateEventTimingInput
  ) {
    try {
      const res = await apolloClient.mutate<
        UpdateEventTiming,
        UpdateEventTimingVariables
      >({
        mutation: UPDATE_EVENT_TIMING,
        variables: { eventId, timingId, data }
      });

      if (!res || !res.data || !res.data.updateEventTimingById) {
        throw new Error('Failed to update event timing');
      }
      return res.data.updateEventTimingById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  async removeEventTimingById(eventId: string, timingId: string) {
    try {
      const res = await apolloClient.mutate<
        RemoveEventTiming,
        RemoveEventTimingVariables
      >({
        mutation: REMOVE_EVENT_TIMING,
        variables: { eventId, timingId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to remove event timing');
      }
      return res.data.removeEventTimingById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }
}

export default new EventTimingService();
