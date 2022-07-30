import {
  LoadingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";

import phone from "../../assets/images/phone.png";
import email from "../../assets/images/email.png";
import person from "../../assets/images/person.png";

import { message, Form, Button, Input, Image } from "antd";
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

function ProfileHeader() {
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [user, setuser] = useState({
    name: "Nitish kumar",
    email: "Nitishr833@gmail.com",
    number: "7033161175",
  });
  const [form] = Form.useForm();

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

  const onEdit = () => {
    setEdit(true);
    form.setFieldsValue({ ...user });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    setuser(values);
    // createPost(values, () => {
    //   form.resetFields();
    // });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </div>
  // );

  // function editbutton(index) {
  //   console.log(index);
  // }

  return (
    <>
      <Row
        justify="center"
        align="start"
        style={{
          height: "300px",
          width: "100%",
          backgroundColor: "#3E3F47",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Row
          justify="end"
          style={{
            width: "100%",
          }}
        >
          <Button type="default" icon={<EditOutlined />} onClick={onEdit} />
        </Row>
        <Col align="center" justify="middle" style={{ borderRadius: "50%" }}>
          <div
            className="profile-image"
            style={{
              padding: "20px",
              backgroundColor: "gray",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          >
            {/* <Upload
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
            </Upload> */}
            <Image
              width={100}
              preview={false}
              className="profile-image"
              src={person}
            />
          </div>
        </Col>
        <Col>
          <Form
            name="profile_edit_form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Row align="middle">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              >
                <span className="profileinfo logo">
                  <Image
                    width={20}
                    preview={false}
                    className="profile-image"
                    src={person}
                  />
                </span>

                <span className="profileinfo name">
                  {isEdit == true ? (
                    <Input placeholder="Full name" />
                  ) : (
                    user.name
                  )}
                </span>
              </Form.Item>
            </Row>

            <Row align="middle">
              <span className="profileinfo logo">
                <Image
                  width={20}
                  preview={false}
                  className="profile-image"
                  src={email}
                />
              </span>
              <span className="profileinfo email">
                {isEdit == true ? (
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                ) : (
                  user.email
                )}
              </span>
            </Row>
            <Row align="middle">
              <span className="profileinfo logo">
                <Image
                  width={20}
                  preview={false}
                  className="profile-image"
                  src={phone}
                />
              </span>

              <span className="profileinfo number">
                {isEdit == true ? (
                  <Form.Item
                    name="number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter mobile number!",
                      },
                    ]}
                  >
                    <Input placeholder="Mobile number" />
                  </Form.Item>
                ) : (
                  user.number
                )}
              </span>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ProfileHeader;
