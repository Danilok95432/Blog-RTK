import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "./api";
import { search } from "./search";
import { comments } from "./comments";
import { reactions } from "./reactions";
import { authorization } from "./authorization";
import { user } from "./user";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "authorization"],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [search.reducerPath]: search.reducer,
  [comments.reducerPath]: comments.reducer,
  [reactions.reducerPath]: reactions.reducer,
  [authorization.reducerPath]: authorization.reducer,
  [user.reducerPath]: user.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
