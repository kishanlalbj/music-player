import { Avatar, Button, Card, List, Tag, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useGetPlaylistByIdQuery } from "../app/services/playlistService";
import fallbackLogo from "../assets/music-note-dark.svg";
import { PlayCircleTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setNowPlaying } from "../app/slices/musicPlayer";

const PlaylistDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state) => state.musicPlayer);

  const { data, isLoading } = useGetPlaylistByIdQuery(id);

  const handlePlay = () => {
    dispatch(setNowPlaying(data?.result?.tracks));
    dispatch(setCurrentSong(data?.result.tracks[0]));
  };

  return (
    <div className="container">
      <div className="playlist-detail-container">
        <div className="playlist-detail-cover">
          <img src={fallbackLogo} width={"100%"}></img>
        </div>
        <div>
          <Typography.Text
            level={5}
            style={{ fontSize: "1.2rem", fontWeight: 600 }}
          >
            {data?.result?.name} ({data?.result?.tracks?.length} tracks)
          </Typography.Text>
          <br />

          <div style={{ marginTop: "12px" }}>
            <Button
              type="primary"
              icon={<PlayCircleTwoTone />}
              onClick={handlePlay}
            >
              Play
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <List
          loading={isLoading}
          pagination={{
            position: "bottom",
            pageSize: 10
          }}
          itemLayout="horizontal"
          dataSource={data?.result?.tracks}
          renderItem={(item) => {
            return (
              <List.Item style={{ cursor: "pointer" }}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.cover ? item.cover : fallbackLogo} />
                  }
                  title={
                    <Typography.Text>
                      {item.name}
                      {currentSong._id === item._id && (
                        <Tag bordered={false} color="geekblue">
                          Playing
                        </Tag>
                      )}
                    </Typography.Text>
                  }
                  description={item.album}
                />
              </List.Item>
            );
          }}
        ></List>
      </Card>
    </div>
  );
};

export default PlaylistDetail;
