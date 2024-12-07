import { createContext, useState } from "react";

export const MusicPlayerContext = createContext({
  songs: null,
  setSongs: () => {}
});

const MusicPlayerContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  return (
    <MusicPlayerContext.Provider value={{ songs, setSongs }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerContextProvider;
