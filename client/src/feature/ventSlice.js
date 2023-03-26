import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVents } from "../api";

const initialState = {
  posts: [],
  isLoading: true,
  post: null,
  error: "",
};

export const ventSlice = createSlice({
  name: "vent",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    setPostsPerPage: (state, action) => {
      state.isLoading = false;
      const prePost = state.posts;
      state.posts = [...prePost, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVents.pending, (state) => {
      state.isLoading = true;
    });
    // builder.addCase(getAllVents.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.posts = action.payload;
    // });
  },
});

export const getAllVents = createAsyncThunk(
  "vent/getAllVents",
  async (page, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await getVents(page);
      if (page === 1) {
        dispatch(ventSlice.actions.setPosts(data));
      } else {
        dispatch(ventSlice.actions.setPostsPerPage(data));
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
// export const { reducerName } = ventSlice.actions;

export default ventSlice.reducer;
