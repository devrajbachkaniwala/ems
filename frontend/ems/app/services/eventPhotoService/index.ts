import { apolloClient } from 'app/graphql';
import {
  CREATE_EVENT_PHOTO,
  REMOVE_EVENT_PHOTO,
  UPDATE_EVENT_PHOTO
} from './mutations';
import {
  AddEventPhoto,
  AddEventPhotoVariables
} from './__generated__/AddEventPhoto';
import {
  RemoveEventPhoto,
  RemoveEventPhotoVariables
} from './__generated__/RemoveEventPhoto';
import {
  UpdateEventPhoto,
  UpdateEventPhotoVariables
} from './__generated__/UpdateEventPhoto';

class EventPhotoService {
  async addEventPhotoByEventId(eventId: string, photo: string) {
    try {
      const res = await apolloClient.mutate<
        AddEventPhoto,
        AddEventPhotoVariables
      >({ mutation: CREATE_EVENT_PHOTO, variables: { photo, eventId } });

      if (!res || !res.data || !res.data.addEventPhotoByEventId) {
        throw new Error('Failed to create event photo');
      }
      return res.data.addEventPhotoByEventId;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  async updateEventPhotoById(eventId: string, photoId: string, photo: string) {
    try {
      const res = await apolloClient.mutate<
        UpdateEventPhoto,
        UpdateEventPhotoVariables
      >({
        mutation: UPDATE_EVENT_PHOTO,
        variables: { eventId, photoId, photo }
      });

      if (!res || !res.data || !res.data.updateEventPhotoById) {
        throw new Error('Failed to update event photo');
      }
      return res.data.updateEventPhotoById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  async removeEventPhotoById(eventId: string, photoId: string) {
    try {
      const res = await apolloClient.mutate<
        RemoveEventPhoto,
        RemoveEventPhotoVariables
      >({
        mutation: REMOVE_EVENT_PHOTO,
        variables: { eventId, photoId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to remove event photo');
      }
      return res.data.removeEventPhotoById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }
}

export default new EventPhotoService();
