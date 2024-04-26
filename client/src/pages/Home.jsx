import { useEffect, useState } from "react";
import { Avatar, Button, Card, List, Modal, Tag, Typography } from "antd";
import fallbackLogo from "../assets/music-note-dark.svg";
import { useGetAllSongsQuery } from "../app/services/songsService";
import { setCurrentSong, setNowPlaying } from "../app/slices/musicPlayer";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { uploadSongApi } from "../api";

const Home = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const { currentSong } = useSelector((state) => state.musicPlayer);

  const [songs, setSongs] = useState([]);
  const [show, setShow] = useState(false);

  const { data, isLoading, isError } = useGetAllSongsQuery();

  useEffect(() => {
    if (!isLoading && data?.results) {
      setSongs(data.results);
      dispatch(setNowPlaying(data.results));
    }

    if (isError) {
      setShow(true);
    }
  }, [data, isLoading, isError, dispatch]);

  const selectSong = (id) => {
    const index = songs.findIndex((s) => s._id === id);
    if (index !== -1) {
      dispatch(setCurrentSong(songs[index]));
    }
  };

  const handleBeforeUpload = (file) => {
    setFile(file);

    return false;
  };

  const handleUpload = async () => {
    setLoading(true);

    setTimeout(() => {
      uploadSongApi(file);
    }, 100);

    setLoading(false);
  };

  return (
    <div>
      <div className="container">
        <>
          <section>
            <>
              <div className="songs-list-header">
                <Typography.Title level={4}>All Songs</Typography.Title>

                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={() => setShow((prev) => !prev)}
                >
                  Upload
                </Button>
              </div>
            </>

            <>
              <Card>
                <List
                  loading={isLoading}
                  pagination={{
                    position: "bottom",
                    pageSize: 4,
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

      <Modal
        open={show}
        title="Upload a song"
        onOk={handleUpload}
        confirmLoading={loading}
        onCancel={() => setShow(false)}
      >
        <Dragger multiple={false} name="file" beforeUpload={handleBeforeUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">We support only .mp3 fies</p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default Home;
