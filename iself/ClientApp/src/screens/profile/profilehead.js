import {
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Player } from "@lottiefiles/react-lottie-player";
import phone from "../../assets/images/phone.png";
import email from "../../assets/images/email.png";
// import person from "../../assets/images/person.png";

import { Form, Button, Input, Image } from "antd";
import React, { useContext, useState } from "react";
import { Col, Row } from "antd";
import { AccountContext } from "../../context/accountContext";

import person from "../../assets/images/avtar.jpg";
import signout from "../../assets/images/signout.png";
import editlogo from "../../assets/animatedIcons/edit.json";

function ProfileHeader() {
  const [isEdit, setEdit] = useState(false);
  const [isInitialLoad, setInitialLoad] = useState(true);

  const accountContext = useContext(AccountContext);
  const { getAccountDetails, updateProfileDetails, logout } =
    accountContext.actions.account;
  const { userDetails } = accountContext.state.account;

  if (isInitialLoad) {
    getAccountDetails();
    setInitialLoad(false);
  }

  // const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState();
  // const [user, setuser] = useState({
  //   name: "Nitish kumar",
  //   email: "Nitishr833@gmail.com",
  //   number: "7033161175",
  // });
  const [form] = Form.useForm();

  const onEdit = () => {
    setEdit(true);
    form.setFieldsValue({ ...userDetails });
  };

  const onFinish = (values) => {
    updateProfileDetails(values, () => {
      getAccountDetails();
      setEdit(false);
    });
  };

  return (
    <>
      <Row
        justify="center"
        align="start"
        style={{
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
          align="top"
        >
          {!isEdit && (
            <Button
              style={{ border: "1px solid #4361EE" }}
              type="default"
              // icon={<EditOutlined />}
              icon={
                <Player
                  hover={true}
                  loop
                  src={editlogo}
                  style={{ height: "32px", width: "25px" }}
                ></Player>
              }
              onClick={onEdit}
            />
          )}
          {isEdit && (
            <Button
              style={{ border: "1px solid #4361EE" }}
              type="link"
              icon={<CheckOutlined />}
              onClick={() => {
                form.submit();
              }}
            />
          )}
          {isEdit && (
            <Button
              style={{
                border: "1px solid #4361EE",
                backgroundColor: "#4361EE",
              }}
              type="text"
              icon={<CloseOutlined />}
              onClick={() => {
                setEdit(false);
              }}
            />
          )}

          {!isEdit && (
            <Button
              style={{ backgroundColor: "#4361EE", borderRadius: "0px" }}
              onClick={logout}
              type="primary"
              icon={<LogoutOutlined />}
            />
          )}
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <div
              className="profile-image"
              style={{
                padding: "20px",
                backgroundColor: "gray",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            >
              <Image
                width={100}
                preview={false}
                className="profile-image"
                src={person}
              />
            </div>
          </Col>
          <Col>
            {userDetails && (
              <Form
                name="profile_edit_form"
                initialValues={{
                  remember: false,
                }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
                layout="vertical"
                size="large"
              >
                <Row
                  align="middle"
                  gutter={[5, 0]}
                  style={{ marginBottom: 10 }}
                >
                  <Col>
                    <Image
                      width={20}
                      preview={false}
                      className="profile-image"
                      src={person}
                    />
                  </Col>

                  <Col>
                    {isEdit === true ? (
                      <Form.Item
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your full name!",
                          },
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Full name" />
                      </Form.Item>
                    ) : (
                      userDetails.fullName
                    )}
                  </Col>
                </Row>

                <Row
                  align="middle"
                  gutter={[5, 0]}
                  style={{ marginBottom: 10 }}
                >
                  <Col>
                    <Image
                      width={20}
                      preview={false}
                      className="profile-image"
                      src={email}
                    />
                  </Col>
                  <Col>
                    {isEdit === true ? (
                      <Form.Item name="email" style={{ marginBottom: 0 }}>
                        <Input disabled={true} placeholder="Email" />
                      </Form.Item>
                    ) : (
                      userDetails.email
                    )}
                  </Col>
                </Row>

                <Row
                  align="middle"
                  gutter={[5, 0]}
                  style={{ marginBottom: 10 }}
                >
                  <Col>
                    <Image
                      width={20}
                      preview={false}
                      className="profile-image"
                      src={phone}
                    />
                  </Col>
                  <Col>
                    {isEdit === true ? (
                      <Form.Item name="phoneNumber" style={{ marginBottom: 0 }}>
                        <Input placeholder="Mobile number" />
                      </Form.Item>
                    ) : userDetails.phoneNumber ? (
                      userDetails.phoneNumber
                    ) : (
                      "---"
                    )}
                  </Col>
                </Row>
              </Form>
            )}
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default ProfileHeader;
