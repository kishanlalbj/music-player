import { useEffect, useState } from "react";
import { Alert, Avatar, Card, List, Tag, Typography } from "antd";
import fallbackLogo from "../assets/music-note-dark.svg";
import { useGetAllSongsQuery } from "../app/services/songsService";
import { setCurrentSong, setNowPlaying } from "../app/slices/musicPlayer";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state) => state.musicPlayer);

  const [songs, setSongs] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const { data, isLoading, isError } = useGetAllSongsQuery();

  useEffect(() => {
    if (!isLoading && data?.results) {
      setSongs(data.results);
      dispatch(setNowPlaying(data.results));
    }

    if (isError) {
      setShow(true);
      setMessage("Something went wrong");
    }
  }, [data, isLoading, isError, dispatch]);

  const selectSong = (id) => {
    const index = songs.findIndex((s) => s._id === id);
    if (index !== -1) {
      dispatch(setCurrentSong(songs[index]));
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
            <Typography.Title level={4}>Songs List</Typography.Title>

            <>
              <Card>
                <List
                  loading={isLoading}
                  pagination={{
                    position: "bottom",
                    pageSize: 4
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
                            src={item.cover ? `${item.cover}` : fallbackLogo}
                          />
                        }
                        title={
                          <Typography.Text>
                            {item.name} &nbsp;{" "}
                            {currentSong._id === item._id && (
                              <Tag bordered={false} color="geekblue">
                                Playing
                              </Tag>
                            )}
                          </Typography.Text>
                        }
                        description={item.album}
                      />
                      {/* 
                      {currentSong._id !== item._id && (
                        <div>
                          <CaretRightFilled style={{ fontSize: "1.4rem" }} />
                        </div>
                      )} */}
                    </List.Item>
                  )}
                ></List>
              </Card>
            </>
          </section>
        </>
      </div>

      <div className="alert-wrapper">
        {show && (
          <Alert type="info" closable message={message} showIcon></Alert>
        )}
      </div>
    </div>
  );
};

export default Home;
