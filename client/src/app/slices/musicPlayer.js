import { createSlice } from "@reduxjs/toolkit";

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState: {
    currentSong: {},
    nowPlayingList: []
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setNowPlaying: (state, action) => {
      state.nowPlayingList = action.payload;
    }
  }
});

export const { setCurrentSong, setNowPlaying } = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
