import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./generalStore";
import bandReducer from "./bandStore";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    band: bandReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
