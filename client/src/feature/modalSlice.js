import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  ismoodSelecting: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
    openMoodModal: (state) => {
      state.ismoodSelecting = true;
    },
    closeMoodModal: (state) => {
      state.ismoodSelecting = false;
    },
    openMoodAndModal: (state) => {
      state.ismoodSelecting = true;
      state.open = true;
    },
  },
});

export const {
  openModal,
  closeModal,
  openMoodModal,
  closeMoodModal,
  openMoodAndModal,
} = modalSlice.actions;

export default modalSlice.reducer;
