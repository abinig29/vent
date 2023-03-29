import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getVents,
  reactToSingleVent,
  getSingleVent,
  getListening,
} from "../api";
import { setUserOnly } from "./userSlice.js";

const initialState = {
  posts: [],
  isLoading: true,
  reactionLoading: true,
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
    setIndvPost: (state, action) => {
      state.reactionLoading = false;
      state.post = action.payload;
    },
    setPost: (state, action) => {
      state.isLoading = false;
      const newPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      state.posts = newPosts;
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
    builder.addCase(reactToVent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVent.pending, (state) => {
      state.reactionLoading = true;
    });
    builder.addCase(getListeningVents.pending, (state) => {
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
export const reactToVent = createAsyncThunk(
  "vent/reactToVent",
  async ({ postId, mood }, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await reactToSingleVent(postId, mood);
      dispatch(ventSlice.actions.setPost(data));
      return data;
    } catch (error) {}
  }
);
export const getVent = createAsyncThunk(
  "vent/getVent",
  async (postId, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await getSingleVent(postId);
      dispatch(ventSlice.actions.setIndvPost(data));
      return data;
    } catch (error) {}
  }
);
export const getListeningVents = createAsyncThunk(
  "vent/getListeningVents",
  async (li, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await getListening();
      console.log(data);
      dispatch(ventSlice.actions.setPosts(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
// export const { reducerName } = ventSlice.actions;

export default ventSlice.reducer;
