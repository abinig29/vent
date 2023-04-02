import { Token } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  saveThought,
  login,
  followUnfollow,
  editUserProfile,
  editUserProfileWithPhoto,
} from "../api";
import axios from "axios";

const initialState = {
  user: null,
  Token: null,
  isLoading: true,
  error: false,
};
let token;
const preUser = localStorage.getItem("user");
if (preUser) {
  token = JSON.parse(preUser).token;
}
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
      localStorage.setItem(
        "user",
        JSON.stringify({ user: action.payload, token })
      );
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
  async (userInfo, { dispatch }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        userInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(userSlice.actions.setSucess());
      return data;
    } catch (error) {
      dispatch(userSlice.actions.setError());
    }
  }
);
export const Login = createAsyncThunk(
  "user/Login",
  async (userInfo, { dispatch }) => {
    try {
      const {
        data: { data },
      } = await login(userInfo);
      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user, token: data.token })
      );
      dispatch(userSlice.actions.setUser(data));
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

export const { setUser, setUserOnly } = userSlice.actions;

export default userSlice.reducer;
