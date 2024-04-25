import { createSlice } from "@reduxjs/toolkit";

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState: {
    currentSong: {},
    nowPlayingList: [],
    currentSongIndex: 0
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      const index = state.nowPlayingList.findIndex(
        (s) => s._id === action.payload._id
      );
      if (index !== -1) {
        state.currentSongIndex = index;
      }
    },
    setNowPlaying: (state, action) => {
      state.nowPlayingList = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    }
  }
});

export const { setCurrentSong, setNowPlaying, setCurrentSongIndex } =
  musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
