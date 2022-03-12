import { UpdateEventInput } from '__generated__/globalTypes';
import { apolloClient } from '../../graphql';
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './mutations';
import { Event_List, EVENT_DETAIL, MY_EVENTS } from './queries';
import { CreateEvent, CreateEventVariables } from './__generated__/CreateEvent';
import { DeleteEvent, DeleteEventVariables } from './__generated__/DeleteEvent';
import { EventDetail, EventDetailVariables } from './__generated__/EventDetail';
import { EventList } from './__generated__/EventList';
import { MyEvents } from './__generated__/MyEvents';
import { UpdateEvent, UpdateEventVariables } from './__generated__/UpdateEvent';

class EventService {
  async getAllEvents() {
    try {
      const res = await apolloClient.query<EventList>({
        query: Event_List
      });

      if (!res || !res.data || !res.data.events?.length) {
        throw new Error('event not found');
      }

      return res.data.events;
    } catch (err: any) {
      throw err;
    }
  }

  async createEvent(data: CreateEventVariables['data']) {
    try {
      const res = await apolloClient.mutate<CreateEvent, CreateEventVariables>({
        mutation: CREATE_EVENT,
        variables: { data }
      });

      if (!res || !res.data || !res.data.createEvent) {
        throw new Error('Failed to create an event');
      }
      return res.data?.createEvent;
    } catch (err: any) {
      throw err;
    }
  }

  async updateEventById(eventId: string, data: UpdateEventInput) {
    try {
      const res = await apolloClient.mutate<UpdateEvent, UpdateEventVariables>({
        mutation: UPDATE_EVENT,
        variables: { data, eventId }
      });

      if (!res || !res.data || !res.data.updateEventById) {
        throw new Error('Failed to update an event');
      }
      return res.data?.updateEventById;
    } catch (err: any) {
      throw err;
    }
  }

  async getEventById(eventId: string) {
    try {
      const res = await apolloClient.query<EventDetail, EventDetailVariables>({
        query: EVENT_DETAIL,
        variables: { eventId }
      });

      if (!res || !res.data || !res.data.eventById) {
        throw new Error('Event not found');
      }
      return res.data?.eventById;
    } catch (err: any) {
      throw err;
    }
  }

  async deleteEventById(eventId: string) {
    try {
      const res = await apolloClient.mutate<DeleteEvent, DeleteEventVariables>({
        mutation: DELETE_EVENT,
        variables: { eventId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to delete an event');
      }
      return res.data?.deleteEventById;
    } catch (err: any) {
      throw err;
    }
  }

  async orgEvents() {
    try {
      const res = await apolloClient.query<MyEvents>({ query: MY_EVENTS });

      if (!res || !res.data) {
        throw new Error('Organization Events not found');
      }
      return res.data?.organization.events;
    } catch (err: any) {
      throw err;
    }
  }
}

export default new EventService();
