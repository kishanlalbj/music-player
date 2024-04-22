import { useEffect, useRef, useState } from "react";
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
import { Button, Slider, Typography } from "antd";
import formatTime from "../../utils/formatTime";
import fallbackLogo from "../../assets/music-note-dark.svg";
import { BASE_URL } from "../../api";

const MusicPlayer = ({ song, onNext, onPrevious, onShuffle }) => {
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
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

  useEffect(() => {
    const playSong = () => {
      if (audioRef && audioRef.current && song) {
        console.log(audioRef.current);
        audioRef.current.src = `${BASE_URL}/songs/${song._id}/play`;
        audioRef.current.autoplay = true;
        // audioRef.current.muted = true;
        // audioRef?.current?.play();
        setPlaying(true);
      }
    };

    playSong();
  }, [song]);

  useEffect(() => {
    let timer;
    if (song && playing) {
      timer = setInterval(() => {
        if (audioRef.current.currentTime === audioRef.current.duration) {
          handleNext();
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

  // useEffect(() => {
  //   setInterval(() => {

  //   }, 500);
  // }, []);

  return (
    <div className="music-player-wrapper">
      <div className="">
        <div className="music-player">
          <audio ref={audioRef}></audio>
          <div className="music-details">
            <div>
              <img
                src={
                  song?.cover
                    ? `data:image/png;base64,${song.cover}`
                    : fallbackLogo
                }
                width={"128px"}
              ></img>
            </div>
            <div>
              <Typography.Title level={4}>{song?.name}</Typography.Title>
              <Typography.Text>{song?.album}</Typography.Text>
              <br />
              <Typography.Text>{song?.artist}</Typography.Text>
              <br />
            </div>
          </div>
          <br />

          <div className="audio-controls-container">
            <div className="audio-progress">
              <div className="audio-duration-container">
                <p>
                  <Typography.Text style={{ color: "#868589" }}>
                    {formatTime(currentTime)}
                  </Typography.Text>
                </p>

                <p>
                  <Typography.Text style={{ color: "#868589" }}>
                    {formatTime(audioRef?.current?.duration)}
                  </Typography.Text>
                </p>
              </div>

              <Slider
                onChange={handleProgress}
                style={{ flex: 1 }}
                value={currentTime}
                min={0}
                max={audioRef?.current?.duration}
                defaultValue={audioRef?.current?.duration}
                tooltip={{ formatter: (value) => formatTime(value) }}
              ></Slider>
            </div>

            <div className="audio-control-btns-container">
              <Button
                type="primary"
                shape="circle"
                icon={<RetweetOutlined />}
                onClick={onShuffle}
              ></Button>
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
                ></Button>
              ) : (
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CaretRightOutlined />}
                  onClick={handlePlay}
                ></Button>
              )}

              <Button
                type="primary"
                shape="circle"
                icon={<StepForwardOutlined />}
                onClick={handleNext}
              ></Button>

              <Button
                type={!audioRef.current.muted ? "primary" : "default"}
                shape="circle"
                onClick={handleMute}
                icon={
                  audioRef.current.muted ? <MutedOutlined /> : <SoundFilled />
                }
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
