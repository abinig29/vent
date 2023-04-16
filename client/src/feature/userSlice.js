import { Token } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  saveThought,
  login,
  followUnfollow,
  editUserProfile,
  editUserProfileWithPhoto,
  removeSaveThought,
} from "../api";
import axios from "axios";
import { setDeleteVent } from "./ventSlice";

const initialState = {
  user: null,
  Token: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    setSucess: (state) => {
      state.error = false;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.error = false;
      state.isLoading = false;
      state.user = user;
      state.Token = token;
    },
    setUserOnly: (state, action) => {
      state.user = action.payload;
      const token = state.Token;
      localStorage.setItem(
        "user",
        JSON.stringify({ user: action.payload, token })
      );
    },
    logout: (state, action) => {
      state.user = null;
      state.Token = null;
      state.isLoading = false;
      state.error = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Login.pending, (state) => {
      state.isLoading = true;
    });
  },
});
export const Signup = createAsyncThunk(
  "user/Sigup",
  async ({ formData, setPageType }, { dispatch }) => {
    try {
      const { data } = await axios.post(
        "https://vent-now.onrender.com/api/v1/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(userSlice.actions.setSucess());
      setPageType("login");
      return data;
    } catch (error) {
      dispatch(userSlice.actions.setError());
    }
  }
);
export const Login = createAsyncThunk(
  "user/Login",
  async ({ values: userInfo, navigate }, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await login(userInfo);
      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user, token: data.token })
      );
      dispatch(userSlice.actions.setUser(data));
      navigate("/home");
      return data;
    } catch (error) {
      dispatch(userSlice.actions.setError());
    }
  }
);
export const saveVent = createAsyncThunk(
  "user/saveVent",
  async (postId, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await saveThought(postId);
      dispatch(userSlice.actions.setUserOnly(data));
      return data;
    } catch (error) {}
  }
);
export const removeFromSaved = createAsyncThunk(
  "user/removeFromSaved",
  async (postId, { dispatch }) => {
    dispatch(setDeleteVent(postId));
    try {
      const {
        data: { data },
      } = await removeSaveThought(postId);
      dispatch(userSlice.actions.setUserOnly(data));
      return data;
    } catch (error) {}
  }
);
export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ userId, body }, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await editUserProfile({ userId, body });
      dispatch(userSlice.actions.setUserOnly(data));
      return data;
    } catch (error) {}
  }
);
export const followUnfollowUser = createAsyncThunk(
  "user/followUnfollowUser",
  async (friendId, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await followUnfollow(friendId);
      dispatch(userSlice.actions.setUserOnly(data));
      return data;
    } catch (error) {}
  }
);

export const { setUser, setUserOnly, logout } = userSlice.actions;

export default userSlice.reducer;
