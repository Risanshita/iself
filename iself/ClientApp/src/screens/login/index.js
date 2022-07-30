import React from "react";
import { Button, Col, Form, Image, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Input, { InputPassword } from "../../components/Input";
import image from "../../assets/images/login-image.png";
import { AccountContext } from "../../context/accountContext";
import "./Style.css";

const Login = () => {
  const { actions, state } = useContext(AccountContext);
  const { login } = actions.account;
  const { userDetails } = state.account;
  const [errors, setError] = useState([]);
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (!values.username)
      validateData(null, { name: "username", isValid: false });
    if (!values.password)
      validateData(null, { name: "password", isValid: false });

    if (errors.length === 0) {
      login({ username: values.username, password: values.password }, () => {
        navigate("/");
      });
    }
  };
  const validateData = (
    e,
    { name, value, required, referenceValue, isValid }
  ) => {
    var err = errors;
    if (isValid) {
      err = errors.filter((a) => a !== name);
    } else {
      if (errors.findIndex((a) => a === name) === -1) err.push(name);
    }
    setError([...err]);
  };

  return (
    <>
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
            <Col xs={22} sm={22} md={20} lg={18} xl={18}>
              <div className="specing" style={{ padding: "0 10px" }}>
                <div style={{ fontSize: 30 }}>Log In</div>
                <p>Welcome back{userDetails.fullName}!</p>
              </div>
              <Form
                name="login_form"
                onFinish={onFinish}
                initialValues={{}}
                size="middle"
                style={{ width: "100%", minWidth: "250px" }}
                layout={"vertical"}
                form={form}
              >
                <Input
                  onLeave={validateData}
                  label={"USER NAME"}
                  name="username"
                  required={true}
                  isError={errors.findIndex((a) => a === "username") !== -1}
                  message="Please enter username"
                />

                <InputPassword
                  onLeave={validateData}
                  referenceValue="credentialDetails"
                  label={"PASSWORD"}
                  name="password"
                  required={true}
                  isError={errors.findIndex((a) => a === "password") !== -1}
                  message="Please enter password"
                />
                <Form.Item>
                  <Row justify="center" style={{ padding: "0 10px" }}>
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
    </>
  );
};

export default Login;
