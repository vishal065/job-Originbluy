import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

enum LoadingType {
  "idle",
  "pending",
  "succeeded",
  "failed",
}

interface LoginData {
  email: string;
  password: string;
}
interface SignupData {
  name: string;
  email: string;
  password: string;
}
type LoginResponse = {
  statusCode: number;
  data: {
    _id: string;
    name: string;
    email: string;
    __v: number;
    accessToken: string;
  };
  message: string;
  success: boolean;
};
export interface AuthState {
  auth: LoginResponse | null;
  loading: LoadingType;
}
const initialState: AuthState = {
  auth: null,
  loading: LoadingType.idle,
};

const login = createAsyncThunk("auth/login", async (data: LoginData) => {
  const res = await axios.post(
    "http://localhost:3001/api/v1/auth/signin",

    data
  );
  if (res.data.statusCode === 200) {
    localStorage.setItem("user", JSON.stringify(""));
  }
  return res.data;
});
const signup = createAsyncThunk("auth/signup", async (data: SignupData) => {
  const res = await axios.post(
    "http://localhost:3001/api/v1/auth/signup",

    data
  );

  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
  },
});

export { login, signup };

export default authSlice.reducer;
