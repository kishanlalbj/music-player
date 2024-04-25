import { useCallback, useEffect, useRef, useState } from "react";
import {
  CaretRightOutlined,
  MutedOutlined,
  PauseOutlined,
  RetweetOutlined,
  SoundFilled,
  StepBackwardOutlined,
  StepForwardOutlined
} from "@ant-design/icons";
import "./MusicPlayer.css";
import { Button, Flex, Slider, Typography } from "antd";
import formatTime from "../../utils/formatTime";
import fallbackLogo from "../../assets/music-note-dark.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSong,
  setCurrentSongIndex
} from "../../app/slices/musicPlayer";

const MusicPlayer = ({ onShuffle }) => {
  const dispatch = useDispatch();
  const {
    currentSong: song = {},
    nowPlayingList,
    currentSongIndex
  } = useSelector((state) => state.musicPlayer);

  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [currentSongIndex, setCurrentSongIndex] = useState(0);

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

  const setSong = useCallback(() => {
    if (audioRef && song) {
      audioRef.current.src = song.directUrl;
      audioRef.current.autoplay = true;
      setPlaying(true);
    }
  }, [song]);

  useEffect(() => {
    setSong();
  }, [setSong, song]);

  useEffect(() => {
    let timer;
    if (song && playing) {
      timer = setInterval(() => {
        // Play next song automatically if exists
        if (
          audioRef.current.currentTime === audioRef.current.duration &&
          currentSongIndex < nowPlayingList.length - 1
        ) {
          handleNext();
        }

        if (audioRef.current.buffered.length === 0) {
          setLoading(true);
        } else {
          setLoading(false);
        }

        setCurrentTime(audioRef.current.currentTime);
      }, 500);
    }

    return () => clearInterval(timer);
  });

  const handleNext = () => {
    if (currentSongIndex === nowPlayingList.length - 1) {
      console.log("Last Song");
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
      dispatch(setCurrentSong(nowPlayingList[currentSongIndex + 1]));
    }
  };

  const handlePrevious = () => {
    if (!currentSongIndex - 1 < 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      dispatch(setCurrentSong(nowPlayingList[currentSongIndex - 1]));
    } else {
      console.log("First song");
    }
  };

  const handleMute = () => {
    if (audioRef.current.muted) audioRef.current.muted = false;
    else audioRef.current.muted = true;
  };

  const handleProgress = (e) => {
    audioRef.current.currentTime = e;
  };

  if (Object.keys(song).length === 0) return <></>;

  return (
    <div className="music-player-wrapper">
      <div className="audio-progress-ref">
        <div className="container">
          <div className="music-player">
            <div className="audio-control-btns-container">
              <Button
                type="primary"
                shape="circle"
                icon={<StepBackwardOutlined />}
                onClick={handlePrevious}
              ></Button>
              {playing ? (
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PauseOutlined />}
                  onClick={handlePause}
                  loading={loading}
                ></Button>
              ) : (
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CaretRightOutlined />}
                  onClick={handlePlay}
                  loading={loading}
                ></Button>
              )}

              <Button
                type="primary"
                shape="circle"
                icon={<StepForwardOutlined />}
                onClick={handleNext}
              ></Button>

              <div className="audio-duration-container">
                <Typography.Text>
                  {formatTime(currentTime)}&nbsp;/&nbsp;
                  {formatTime(audioRef?.current?.duration)}
                </Typography.Text>
              </div>
            </div>

            <div className="music-details">
              <div>
                <img
                  src={song?.cover ? `${song.cover}` : fallbackLogo}
                  className="music-player-album-cover"
                  width={"48px"}
                ></img>
              </div>
              <Flex vertical>
                <Typography.Text
                  style={{ fontWeight: 500 }}
                  className="music-details-title-text"
                >
                  {song?.name}
                </Typography.Text>

                <Typography.Text className="music-details-text">
                  {song?.artist}
                </Typography.Text>
                <br />
              </Flex>
            </div>

            <div className="audio-control-btns-container audio-other-controls">
              <Button
                type={!audioRef.current.muted ? "primary" : "default"}
                shape="circle"
                onClick={handleMute}
                icon={
                  audioRef.current.muted ? <MutedOutlined /> : <SoundFilled />
                }
              ></Button>

              <Button
                type="primary"
                shape="circle"
                icon={<RetweetOutlined />}
                onClick={onShuffle}
              ></Button>
            </div>
          </div>

          {/*  Progress Slider */}
          <div id="audio-progress-slider">
            <Slider
              onChange={handleProgress}
              style={{ flex: 1 }}
              value={currentTime}
              min={0}
              max={audioRef?.current?.duration}
              defaultValue={audioRef?.current?.duration}
              tooltip={{ open: false }}
            ></Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
