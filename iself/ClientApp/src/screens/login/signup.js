import React, { useState } from "react";
import { Button, Col, Form, Image, Row, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import image from "../../assets/images/login-image.png";
import { AccountContext } from "../../context/accountContext";
import userAnimation from "../../assets/animatedIcons/user.json";
import invalid from "../../assets/animatedIcons/invalid.json";
import success from "../../assets/animatedIcons/success.json";
import "./Style.css";

const SignUp = () => {
  const { actions } = useContext(AccountContext);
  const { newUser } = actions.account;
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSignupError, setSignupError] = useState(undefined);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const onFinish = (values) => {
    newUser(values, (response) => {
      if (response.succeeded) {
        setSignupError(false);
        setTimeout(() => {
          navigate("/settings");
        }, 1500);
      } else {
        setSignupError(true);
        setSignupErrorMessage(response.message);
      }
    });
  };

  return (
    <Row
      className="login-page"
      justify="center"
      align="middle"
      style={{ height: "100%" }}
    >
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="intro">
        <Row style={{ height: "100%" }} justify="center" align="middle">
          <Col
            style={{
              textAlign: "center",
            }}
          >
            <Image preview={false} className="login-image" src={image} />
            <div style={{ fontSize: 30 }}>ISELF</div>
            <p>Write your mind here</p>
          </Col>
        </Row>
      </Col>
      <Col className="login-form" xs={24} sm={24} md={12} lg={12} xl={12}>
        <Row
          className="form-body"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col xs={22} sm={22} md={18} lg={12} xl={12}>
            <Row
              align="middle"
              justify="center"
              className="login-animation-wrapper"
            >
              <Col>
                <div className="loginAnimation">
                  {isSignupError === false ? (
                    <Player
                      autoplay
                      loop
                      src={success}
                      style={{ height: "180px", width: "180px" }}
                    ></Player>
                  ) : isSignupError === true ? (
                    <Player
                      autoplay
                      loop
                      src={invalid}
                      style={{ height: "180px", width: "180px" }}
                    ></Player>
                  ) : (
                    <Player
                      autoplay
                      loop
                      src={userAnimation}
                      style={{ height: "180px", width: "180px" }}
                    ></Player>
                  )}
                </div>
              </Col>
            </Row>
            <div className="specing">
              <div style={{ fontSize: 30 }}>Sign up</div>
            </div>
            <Form
              name="signup_form"
              onFinish={onFinish}
              initialValues={{}}
              size="large"
              style={{ width: "100%", minWidth: "250px" }}
              layout={"vertical"}
              form={form}
              onChange={(a) => {
                setSignupError(undefined);
              }}
            >
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name",
                  },
                ]}
              >
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input user email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please choose password",
                  },
                  {
                    min: 6,
                    message: "Password length must be between 6 to 20",
                  },
                ]}
                style={{ marginTop: 10 }}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Row style={{ color: "red" }}>
                {isSignupError === true ? signupErrorMessage : null}
              </Row>
              <Form.Item style={{ marginTop: 20 }}>
                <Row justify="center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 5,
                    }}
                  >
                    SIGN UP
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignUp;
