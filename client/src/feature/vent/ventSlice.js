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
} from "../../api/index.js";
import { setUserOnly } from "../user/userSlice.js";
import { useQueryClient } from "@tanstack/react-query";

const initialState = {
  posts: [],
  isLoading: true,
  reactionLoading: true,
  post: null,
  error: "",
  doneFetching: false,
};

export const ventSlice = createSlice({
  name: "vent",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    setPostsNull: (state, action) => {
      state.posts = [];
    },
    setDonefetching: (state, action) => {
      state.doneFetching = action.payload;
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
    builder.addCase(reactToVent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVent.pending, (state) => {
      state.reactionLoading = true;
    });
  },
});

export const reactToVent = createAsyncThunk(
  "vent/reactToVent",
  async ({ post, mood, changeSatus, onSucess }, { dispatch }) => {
    changeSatus();
    try {
      const {
        data: { data },
      } = await reactToSingleVent(post._id, mood);

      dispatch(setUserOnly(data.curUser));
      onSucess();
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

export const createSingleVent = createAsyncThunk(
  "vent/createSingleVent",
  async (
    { formData, handleClose, setError, setMood, setText, setPicture, onSucess },
    { dispatch }
  ) => {
    try {
      const {
        data: { data },
      } = await createVent(formData);
      console.log("please", data);
      dispatch(ventSlice.actions.createPost(data));
      setError({
        errState: true,
        errType: "success",
        errText: "vent has been created",
      });
      setMood("");
      setText("");
      setPicture("");
      onSucess();
      setTimeout(() => {
        handleClose();
        setError({ errState: false, errType: "", errText: "" });
      }, 1000);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setDeleteVent } = ventSlice.actions;

export default ventSlice.reducer;
