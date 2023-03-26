import axios from "axios";

// const { token } = JSON.parse(localStorage.getItem("user"));
const AUTHAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "'application/json'",
    // Authorization: `Bearer ${token}`,
  },
});
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "'application/json'",
  },
});

export const getVents = (page) => API.get(`/vent?page=${page}`);
export const login = (userInfo) => {
  return API.post("/auth/login", userInfo, {});
};
