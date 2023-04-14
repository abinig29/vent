import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllNotification, seeAllnotification } from "../api";

const initialState = {
  notifications: [],
  unseen: 0,
};

export const notificationSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notifications = action.payload.notifications;
      state.unseen = action.payload.unseen;
    },
    setNotificatios: (state, action) => {
      state.notifications = [...action.payload, ...state.notifications];
      state.unseen = action.payload.length + state.unseen;
    },
  },
});

export const getNotification = createAsyncThunk(
  "notification/getNotification",
  async (userId, { dispatch }) => {
    const {
      data: { data },
    } = await getAllNotification();
    dispatch(notificationSlice.actions.setNotification(data));
  }
);
export const seenAllNotification = createAsyncThunk(
  "notification/seenAllNotification",
  async (userId, { dispatch }) => {
    const {
      data: { data },
    } = await seeAllnotification();
    dispatch(notificationSlice.actions.setNotification(data));
  }
);
export const { reducerName } = notificationSlice.actions;

export default notificationSlice.reducer;
