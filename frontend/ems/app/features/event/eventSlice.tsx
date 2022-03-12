import eventService from '@/services/eventService';
import {
  EventsList,
  EventsList_events
} from '@/services/eventService/__generated__/EventsList';
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  loading: boolean;
  data: EventsList['events'];
  error: string | null;
};

const initialState: TInitialState = {
  loading: false,
  data: [],
  error: null
};

export const getAllEvents: AsyncThunk<EventsList_events[], void, {}> =
  createAsyncThunk('event/getAllEvents', async (_, thunkApi) => {
    try {
      return await eventService.getAllEvents();
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  });

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(getAllEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.data = [];
        state.error = payload as string;
      });
  }
});
