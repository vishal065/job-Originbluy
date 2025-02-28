import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosHandler } from "../../../hooks/axiosHandler";

interface LoginData {
  email: string;
  password: string;
}
interface SignupData {
  name: string;
  email: string;
  password: string;
}

const login = createAsyncThunk("auth/login", async (data: LoginData) => {
  const res = await axiosHandler.post("/auth/signin", data);
  if (res.data.statusCode === 200) {
    return res.data;
  }
  return [];
});
const signup = createAsyncThunk("auth/signup", async (data: SignupData) => {
  const res = await axiosHandler.post(
    "/auth/signup",

    data
  );

  return res.data;
});

const logout = createAsyncThunk("auth/logout", async () => {
  const res = await axiosHandler.post("/auth/logout");

  return res;
});

export { login, signup, logout };
