import {
  LoadingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { message, Upload, Button } from "antd";
import React, { useState } from "react";
import { Col, Row } from "antd";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};
function Profile() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const [size, setSize] = useState("large");
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          width: "100%",
          backgroundColor: "#3E3F47",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <span className="edit-button">
          <Button type="primary" icon={<EditOutlined />} size={size} />{" "}
        </span>
        <Col align="center" justify="middle" style={{ borderRadius: "50%" }}>
          <div className="profile-image" style={{ padding: "20px" }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile pic"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </Col>
        <Col>
          <Row>
            <span className="profileinfo name">
              <InfoCircleOutlined />
            </span>
            <span className="profileinfo name">Nitish kumar</span>
          </Row>
          <Row>
            <span className="profileinfo email">
              <InfoCircleOutlined />
            </span>
            <span className="profileinfo email">Nitishr833@gmail.com</span>
          </Row>
          <Row>
            <span className="profileinfo number">
              <InfoCircleOutlined />
            </span>
            <span className="profileinfo number">7033161175</span>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
