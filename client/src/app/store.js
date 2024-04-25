import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { songsApi } from "./services/songsService";
import { playlistApi } from "./services/playlistService";
import musicPlayerReducer from "./slices/musicPlayer";

const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    musicPlayer: musicPlayerReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      songsApi.middleware,
      playlistApi.middleware
    );
  }
});

setupListeners(store.dispatch);

export default store;
