import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/auth";
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

// const authPersistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authSlice.reducer),
//   images: ImageSlice.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
// });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  images: imageSlice.reducer,
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

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
