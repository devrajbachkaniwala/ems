import authService from '@/services/authService';
import {
  UserProfile,
  UserProfile_user
} from '@/services/authService/__generated__/UserProfile';
import eventService from '@/services/eventService';
import { EventList_events } from '@/services/eventService/__generated__/EventList';
import { makeObservable, observable, action, runInAction } from 'mobx';
import { TTokens } from 'types/token';
import { TLoginUser } from 'types/user';

export class EventStore {
  loading: boolean = false;
  events: EventList_events[] = [];
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      loading: observable,
      events: observable,
      error: observable,
      getAllEvents: action
    });
  }

  async getAllEvents() {
    this.loading = true;
    this.events = [];
    try {
      const res: EventList_events[] = await eventService.getAllEvents();
      runInAction(() => {
        this.loading = false;
        this.events = res;
        this.error = null;
      });
    } catch (err: any) {
      runInAction(() => {
        this.loading = false;
        this.events = [];
        this.error = err.message;
      });
    }
  }

  setEvents(events: EventList_events[]) {
    this.loading = false;
    this.events = events;
    this.error = null;
  }
}
