import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authActions";

enum LoadingType {
  "idle",
  "pending",
  "succeeded",
  "failed",
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.auth = null;
    });
  },
});

export default authSlice.reducer;
