import React, { useState } from "react";
import { Button, Col, Form, Image, Row, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import image from "../../assets/images/login-image.png";
import { AccountContext } from "../../context/accountContext";
import "./Style.css";

const Login = () => {
  const { actions, state } = useContext(AccountContext);
  const { login } = actions.account;
  const { userDetails } = state.account;
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoginError, setLoginError] = useState(false);

  const onFinish = (values) => {
    setLoginError(true);
    console.log("Received values of form: ", values);
    login(
      { username: values.username, password: values.password },
      (success) => {
        if (success) {
          navigate("/profile");
        } else {
          setLoginError(true);
        }
      }
    );
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
            <div className="specing">
              <div style={{ fontSize: 30 }}>Log In</div>
              <p>Welcome back{userDetails.fullName}!</p>
            </div>
            <Form
              name="login_form"
              onFinish={onFinish}
              initialValues={{}}
              size="large"
              style={{ width: "100%", minWidth: "250px" }}
              layout={"vertical"}
              form={form}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                style={{ marginTop: 10 }}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
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
                    SIGN IN
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

export default Login;
