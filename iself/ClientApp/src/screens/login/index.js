import React from "react";
import { Button, Col, Form, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Input, { InputPassword } from "../../components/Input";
import { AccountContext } from "../../accountContext";

const Login = () => {
  const { actions } = useContext(AccountContext);
  const { login } = actions.account;
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
      <Row justify="center" align="middle">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}></Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
              <Row justify="center">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    height: 40,
                  }}
                >
                  SIGN IN
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
