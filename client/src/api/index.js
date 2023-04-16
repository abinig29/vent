import axios from "axios";

let user;
if (localStorage.getItem("user"))
  user = JSON.parse(localStorage.getItem("user")).user;
const API = axios.create({
  baseURL: "https://vent-now.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
const PHOTOAPI = axios.create({
  baseURL: "https://vent-now.onrender.com/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});
PHOTOAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const getVents = (page) => API.get(`/vent?page=${page}`);
export const fetchUser = (userId) => API.get(`/user/${userId}`);
export const getUserVents = (userId, page) =>
  API.get(`/user/${userId}/userVent?page=${page}`);

export const reactToSingleVent = (postId, mood) =>
  API.patch(`/vent/${postId}/${mood}`);

export const saveThought = (postId) => API.patch(`/vent/${postId}/saveThought`);
export const removeSaveThought = (postId) =>
  API.patch(`/vent/${postId}/rmSaveThought`);

export const followUnfollow = (friendId) =>
  API.patch(`/user/opration/follow`, { friendId });

export const getSingleVent = (postId) => API.get(`/vent/${postId}`);

export const getComment = (postId) => API.get(`/vent/${postId}/comment`);
export const getSavedVents = (page) => API.get(`/user/saved?page=${page}`);
export const getReactedVent = ({ page, userId }) =>
  API.get(`/user/${userId}/reactedVent?page=${page}`);

export const getUsers = (user) => {
  return API.get(`/user${user.length > 0 && `?search=${user}`}`);
};
export const getAllNotification = () => {
  return API.get(`/user/notification`);
};
export const getUserList = (id) => {
  return API.get(`user/${id}/lisetnUser`);
};
export const seeAllnotification = () => {
  return API.patch(`user/notification/see`);
};
export const editUserProfile = ({ userId, body }) => {
  return PHOTOAPI.patch(`/user/${userId}`, body);
};

export const postComment = (body) => {
  return API.post(`/comment`, body);
};
export const createVent = (body) => {
  return PHOTOAPI.post(`/vent`, body);
};
export const getListening = (page) => {
  // console.log(localStorage.getItem("user"));
  return API.get(`/user/${user._id}/lisetning?page=${page}`);
};
export const getListeningUser = (userId) => {
  return API.get(`/user/${userId}/lisetnUser`);
};

export const login = (userInfo) => {
  return API.post("/auth/login", userInfo);
};
