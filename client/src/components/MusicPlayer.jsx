/* eslint-disable react-hooks/exhaustive-deps */
import {
  HeartIcon,
  LoaderCircleIcon,
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume1Icon,
  VolumeOffIcon
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import { privateApi } from "../utils";
import formatTime from "../utils/formatTime";

const MusicPlayer = () => {
  const { songs } = useContext(MusicPlayerContext);

  console.log({ songs });

  const audioRef = useRef(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const handlePause = () => {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleNext = () => {
    if (songs.length - 1 === currentSongIndex) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex === 0) setCurrentSongIndex(songs.length - 1);
    else setCurrentSongIndex((prev) => prev - 1);
  };

  const handleShuffle = () => {
    if (songs.length) {
      const random = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(random);
    }
  };

  const handleProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };

  // eslint-disable-next-line no-unused-vars
  const getPlayUrl = async (id) => {
    try {
      setLoading(true);
      const res = await privateApi.get(`/api/songs/${id}/play`);

      return res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const prepareSong = async () => {
      if (songs.length) {
        console.log("Inside ref");
        const url = await getPlayUrl(songs[currentSongIndex]._id);

        audioRef.current.src = url;

        audioRef.current.autoplay = true;
        setPlaying(true);
      }
    };

    prepareSong();
  }, [currentSongIndex, songs, songs.length]);

  useEffect(() => {
    let timer;
    if (songs.length && playing) {
      timer = setInterval(() => {
        if (audioRef.current.currentTime === audioRef.current.duration) {
          handleNext();
          // setPlaying(false);
        }

        if (audioRef.current.buffered.length === 0) {
          setLoading(true);
        } else {
          setLoading(false);
        }

        setCurrentTime(audioRef.current.currentTime);
      }, 500);
    }

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  if (songs.length === 0) return <></>;

  return (
    <div className="absolute w-full left-0 bottom-0 h-20 bg-[#1c1c1c] shadow-lg text-[#f1f1f1]">
      <div className="container flex items-center gap-6 h-full">
        {/*  */}
        <SkipBackIcon
          color="white"
          onClick={handlePrevious}
          className="cursor-pointer"
        />

        {!loading ? (
          !playing ? (
            <button className="bg-primary  rounded-full px-2 py-2 text-center">
              <PlayIcon
                size={28}
                className="cursor-pointer"
                color="white"
                onClick={handlePlay}
              />
            </button>
          ) : (
            <button className="bg-primary  rounded-full px-2 py-2 text-center">
              <PauseIcon
                size={28}
                className="cursor-pointer"
                color="white"
                onClick={handlePause}
              />
            </button>
          )
        ) : (
          <LoaderCircleIcon className="animate-spin"></LoaderCircleIcon>
        )}

        <SkipForwardIcon
          color="white"
          onClick={handleNext}
          className={"cursor-pointer"}
        />

        <div className="flex items-center gap-3">
          <div>
            <img
              src={`data:image/png;base64,${songs[currentSongIndex]?.cover}`}
              alt="cover"
              className="rounded-md"
              width={48}
            ></img>
          </div>

          <div>
            <p>{songs[currentSongIndex]?.name}</p>
            <p className="text-sm text-zinc-300 w-40 overflow-hidden whitespace-nowrap text-ellipsis">
              {songs[currentSongIndex]?.album}
            </p>
          </div>
        </div>

        <div className="text-center flex-1">
          <div className="flex items-center gap-3">
            <p>{formatTime(currentTime)}</p>

            <input
              type="range"
              min={0}
              value={currentTime}
              max={audioRef?.current?.duration}
              onChange={handleProgressChange}
              className="w-full"
            ></input>
            <p>{songs[currentSongIndex].duration}</p>
          </div>
        </div>

        <HeartIcon color="white" className="cursor-pointer" />

        <ShuffleIcon
          color="white"
          className="cursor-pointer"
          onClick={handleShuffle}
        />

        {audioRef.current.volume > 0 ? (
          <Volume1Icon color="white" />
        ) : (
          <VolumeOffIcon color="white"></VolumeOffIcon>
        )}
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={audioRef?.current?.volume}
          onChange={handleVolumeChange}
        ></input>
      </div>
    </div>
  );
};

export default MusicPlayer;
