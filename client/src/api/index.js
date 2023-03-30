import axios from "axios";
import { reactToVent } from "../feature/ventSlice";

let token;
let user;
const preUser = localStorage.getItem("user");
if (preUser) {
  token = JSON.parse(preUser).token;
  user = JSON.parse(preUser).user;
}
const AUTHAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
const PHOTOAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export const getVents = (page) => API.get(`/vent?page=${page}`);

export const reactToSingleVent = (postId, mood) =>
  AUTHAPI.patch(`/vent/${postId}/${mood}`);

export const saveThought = (postId) =>
  AUTHAPI.patch(`/vent/${postId}/saveThought`);

export const followUnfollow = (friendId) =>
  AUTHAPI.patch(`/user/opration/follow`, { friendId });

export const getSingleVent = (postId) => AUTHAPI.get(`/vent/${postId}`);

export const getComment = (postId) => API.get(`/vent/${postId}/comment`);

export const getUsers = (user) =>
  AUTHAPI.get(`/user${user.length > 0 && `?search=${user}`}`);

export const postComment = (body) => {
  return AUTHAPI.post(`/comment`, body);
};
export const createVent = (body) => {
  return PHOTOAPI.post(`/vent`, body);
};
export const getListening = () => {
  return AUTHAPI.get(`/user/${user._id}/lisetning`);
};

export const login = (userInfo) => {
  return API.post("/auth/login", userInfo);
};
