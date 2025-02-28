import axios from "axios";
// import { store } from "../store/store";

export const axiosHandler = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

// axiosHandler.interceptors.request.use(
//   (config) => {
//     // Get the current token from the Redux store
//     const { auth } = store.getState();
//     const token = auth.auth?.data.accessToken;

//     if (token) config.headers.Authorization = `Bearer ${token}`;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
