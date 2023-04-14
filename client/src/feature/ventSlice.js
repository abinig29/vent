import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getVents,
  reactToSingleVent,
  getSingleVent,
  getListening,
  createVent,
  getUserVents,
  getSavedVents,
  getReactedVent,
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
    createPost: (state, action) => {
      state.isLoading = false;
      state.posts = [action.payload, ...state.posts];
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
    setDeleteVent: (state, action) => {
      const newVents = state.posts.filter((vent) => vent._id != action.payload);
      state.posts = newVents;
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
export const getSavedvent = createAsyncThunk(
  "vent/getSavedvent",
  async (page, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await getSavedVents(page);
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
export const getUserVent = createAsyncThunk(
  "vent/getUserVent",
  async ({ page, userId }, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await getUserVents(userId, page);

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
export const getReactedVents = createAsyncThunk(
  "vent/getReactedVents",
  async ({ page, userId }, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await getReactedVent({ userId, page });

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
      console.log(data);
      dispatch(ventSlice.actions.setPost(data.vent));
      dispatch(setUserOnly(data.curUser));
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
  async (page, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await getListening(page);
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
export const createSingleVent = createAsyncThunk(
  "vent/createSingleVent",
  async (body, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await createVent(body);
      dispatch(ventSlice.actions.createPost(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setDeleteVent } = ventSlice.actions;

export default ventSlice.reducer;
