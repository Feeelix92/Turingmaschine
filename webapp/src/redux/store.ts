import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./generalStore";
import bandReducer from "./bandStore";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    band: bandReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["general", "payload"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["general", "payload"],
        // Ignore these paths in the state
        ignoredPaths: ["general", "payload"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
