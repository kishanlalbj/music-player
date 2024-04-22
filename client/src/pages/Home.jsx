import { useCallback, useEffect, useState } from "react";
import { fetchSongsApi } from "../api";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import { Alert, Avatar, Card, List, Tag, Typography } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import fallbackLogo from "../assets/music-note-dark.svg";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [selectedSong, setSelectedSong] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const getSongs = useCallback(async () => {
    const { results } = await fetchSongsApi();

    setSongs(results);
    setSelectedSong(results[currentSongIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  const selectSong = (id) => {
    const index = songs.findIndex((s) => s._id === id);
    if (index !== -1) {
      setSelectedSong(songs[index]);
    }
    setCurrentSongIndex(index);
  };

  const handleNext = () => {
    if (currentSongIndex === songs.length - 1) {
      setShow(true);
      setMessage("This is last song");
    } else {
      setCurrentSongIndex((prev) => prev + 1);
      setSelectedSong(songs[currentSongIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (!currentSongIndex - 1 < 0) {
      setCurrentSongIndex((prev) => prev - 1);
      setSelectedSong(songs[currentSongIndex - 1]);
    } else {
      setShow(true);
      setMessage("This is first song");
    }
  };

  const handleShuffle = () => {
    if (songs.length > 0) {
      const random = Math.floor(Math.random() * songs.length);
      setSelectedSong(songs[random]);
      setCurrentSongIndex(random);
    }
  };

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setShow(false);
      setMessage(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <div className="container">
        <>
          <section>
            <MusicPlayer
              song={songs.length > 0 ? selectedSong : null}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onShuffle={handleShuffle}
            />
          </section>
          <section>
            <Typography.Title level={2} style={{ color: "#ffffff" }}>
              Up Next
            </Typography.Title>

            <>
              <Card>
                <List
                  pagination={{
                    position: "bottom",
                    pageSize: 5
                  }}
                  itemLayout="horizontal"
                  dataSource={songs}
                  renderItem={(item) => (
                    <List.Item
                      style={{ cursor: "pointer" }}
                      onClick={() => selectSong(item._id)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={
                              item.cover
                                ? `data:image/png;base64,${item.cover}`
                                : fallbackLogo
                            }
                          />
                        }
                        title={
                          <Typography.Text>
                            {item.name} &nbsp;{" "}
                            {selectedSong._id === item._id && (
                              <Tag bordered={false} color="geekblue">
                                Playing
                              </Tag>
                            )}
                          </Typography.Text>
                        }
                        description={item.album}
                      />

                      {selectedSong._id !== item._id && (
                        <div>
                          <CaretRightFilled style={{ fontSize: "1.4rem" }} />
                        </div>
                      )}
                    </List.Item>
                  )}
                ></List>
              </Card>
            </>
          </section>
        </>
      </div>

      <div className="alert-wrapper">
        {show && <Alert type="info" closable description={message}></Alert>}
      </div>
    </div>
  );
};

export default Home;
