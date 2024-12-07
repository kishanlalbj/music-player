import { useContext, useEffect, useRef, useState } from "react";
// import {
//   CaretRightOutlined,
//   MutedOutlined,
//   PauseOutlined,
//   RetweetOutlined,
//   SoundFilled,
//   StepBackwardOutlined,
//   StepForwardOutlined
// } from "@ant-design/icons";
import "./MusicPlayer.css";
import { Slider } from "antd";
import formatTime from "../../utils/formatTime";
import fallbackLogo from "../../assets/music-note-dark.svg";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import {
  PauseIcon,
  PlayIcon,
  Repeat1Icon,
  SkipBackIcon,
  SkipForward
} from "lucide-react";
import { privateApi } from "../../utils";
// import { BASE_URL } from "../../api";

const MusicPlayer = ({ onNext, onPrevious, onShuffle }) => {
  const { song } = useContext(MusicPlayerContext);

  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);

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
      if (song) {
        console.log("Inside ref");
        const url = await getPlayUrl(song._id);

        audioRef.current.src = url;
        audioRef.current.autoplay = true;
        setPlaying(true);
      }
    };
    console.log("running...");
    prepareSong();
  }, [song]);

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
    <div className="music-player-wrapper w-[600px]">
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
              <p>{song?.name}</p>
              <p>{song?.album}</p>
              <br />
              <p>{song?.artist}</p>
              <br />
            </div>
          </div>
          <br />

          <div className="audio-controls-container">
            <div className="audio-progress">
              <div className="audio-duration-container">
                <p>{formatTime(currentTime)}</p>

                <p>{formatTime(audioRef?.current?.duration)}</p>
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
              <button
                type="primary"
                shape="circle"
                icon={<Repeat1Icon />}
                onClick={onShuffle}
              ></button>
              <button
                type="primary"
                shape="circle"
                icon={<SkipBackIcon />}
                onClick={handlePrevious}
              ></button>
              {playing ? (
                <button
                  type="primary"
                  shape="circle"
                  icon={<PauseIcon />}
                  onClick={handlePause}
                  loading={loading}
                ></button>
              ) : (
                <button
                  type="primary"
                  shape="circle"
                  icon={<PlayIcon />}
                  onClick={handlePlay}
                  loading={loading}
                ></button>
              )}

              {/* <Button
                type={!audioRef.current.muted ? "primary" : "default"}
                shape="circle"
                onClick={handleMute}
                icon={
                  audioRef.current.muted ? <MutedOutlined /> : <SoundFilled />
                }
              ></Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
