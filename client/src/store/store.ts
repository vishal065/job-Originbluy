import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { imageSlice } from "./features/images/imageSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { axiosHandler } from "../hooks/axiosHandler";
import { VideoSlice } from "./features/videos/videoSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  images: imageSlice.reducer,
  videos: VideoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

store.subscribe(() => {
  const state = store.getState();
  const token = state.auth?.auth?.data?.accessToken;

  if (token) {
    axiosHandler.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosHandler.defaults.headers.common["Authorization"];
  }
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
