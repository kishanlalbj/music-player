import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { songsApi } from "./services/songsService";
import { playlistApi } from "./services/playlistService";

const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(songsApi.middleware);
  }
});

setupListeners(store.dispatch);

export default store;
