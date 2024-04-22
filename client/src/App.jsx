import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import wave from "./assets/wave.svg";
import { ConfigProvider } from "antd";
// import { Modal, message, Upload } from 'antd';
// import { useState } from "react";
// import { uploadSongApi } from "./api";
// import { InboxOutlined } from "@ant-design/icons";
// const { Dragger } = Upload;

function App() {
  // const [loading, setLoading] = useState(false);
  // const [show, setShow] = useState(false);

  // const handleToggleModal = () => setShow((prev) => !prev);

  // const handleFileChange = (info) => {
  //   const { status } = info.file;

  //   if (status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Noto Sans", sans-serif;'
        }
      }}
    >
      <div
        style={{
          background: `url(${wave}) no-repeat`,
          backgroundSize: "cover",
          width: "100%"
        }}
      >
        <Header />

        <Home />
      </div>

      {/* <Modal
        title="Upload your file"
        open={show}
        onOk={handleToggleModal}
        onCancel={handleToggleModal}
      >
        <Dragger
          showUploadList={false}
          name="file"
          multiple={false}
          customRequest={uploadSongApi}
          onChange={handleFileChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Please upload only .mp3 file</p>
        </Dragger>
      </Modal> */}
    </ConfigProvider>
  );
}

export default App;
