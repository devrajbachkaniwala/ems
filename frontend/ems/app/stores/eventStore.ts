import authService from '@/services/authService';
import {
  UserProfile,
  UserProfile_user
} from '@/services/authService/__generated__/UserProfile';
import eventService from '@/services/eventService';
import { EventsList_events } from '@/services/eventService/__generated__/EventsList';
import { makeObservable, observable, action, runInAction } from 'mobx';
import { TTokens } from 'types/token';
import { TLoginUser } from 'types/user';

export class EventStore {
  loading: boolean = false;
  events: EventsList_events[] = [];
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
      const res: EventsList_events[] = await eventService.getAllEvents();
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

  setEvents(events: EventsList_events[]) {
    this.loading = false;
    this.events = events;
    this.error = null;
  }
}
