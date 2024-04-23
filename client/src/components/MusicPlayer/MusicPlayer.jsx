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
import { useGetAllSongsQuery } from "../../app/services/songsService";

const MusicPlayer = ({ song, onNext, onPrevious, onShuffle }) => {
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data } = useGetAllSongsQuery();

  console.log({ data });

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
    }
  }, [song]);

  useEffect(() => {
    setSong();
  }, [setSong, song]);

  useEffect(() => {
    let timer;
    if (song && playing) {
      timer = setInterval(() => {
        if (audioRef.current.currentTime === audioRef.current.duration) {
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
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const handleMute = () => {
    if (audioRef.current.muted) audioRef.current.muted = false;
    else audioRef.current.muted = true;
  };

  const handleProgress = (e) => {
    audioRef.current.currentTime = e;
  };

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
                  src={
                    song?.cover
                      ? `data:image/png;base64,${song.cover}`
                      : fallbackLogo
                  }
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
                {/* <Typography.Text className="music-details-text">
                  {song?.album}
                </Typography.Text> */}
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
