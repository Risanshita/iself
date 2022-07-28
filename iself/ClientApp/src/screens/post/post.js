import { Col, Select, Form, Input, Row, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import LanguageList from "../../utils/LanguageList";
import { PostContext } from "./state";
import "./style.css";

const { Option } = Select;
function Post({ type, onChangeType }) {
  const { actions } = useContext(PostContext);
  const { createPost } = actions.post;

  const [form] = Form.useForm();
  const isData2Visible =
    type === PostTypes.paraphase || type === PostTypes.refactor;
  const isCode = type === PostTypes.codeTip || type === PostTypes.refactor;

  useEffect(
    function () {
      form.setFieldsValue({});
    },
    [type]
  );
  const getPlaceholderData2 = () => {
    return type === PostTypes.Paraphase
      ? "Please enter paraphase"
      : "Write your refactor code here ...";
  };

  const getPlaceholderData1 = () => {
    switch (type) {
      case PostTypes.paraphase:
        return "Write your Incorrect Paraphase here .. ";
      case PostTypes.notification:
        return "Write your Notification here .. ";
      case PostTypes.codeTip:
        return "Write your code here .. ";
      case PostTypes.refactor:
        return "Write your code here ...";
      default:
        return "Write your Info Byte here .. ";
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    createPost(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row
      className="postnew-page"
      justify="center"
      align="middle"
      style={{ height: "100%" }}
    >
      <Col
        xs={24}
        sm={24}
        md={!isData2Visible ? 16 : 20}
        lg={!isData2Visible ? 12 : 16}
        xl={!isData2Visible ? 12 : 16}
        style={{
          height: "100%",
          padding: 20,
          transition: "width 2s linear 1s",
          WebkitTransition: "width 2s linear 1s",
          transitionDelay: "2s",
        }}
      >
        {/* <h1>Hello</h1> */}{" "}
        <Form
          name="post_form"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row
            style={{
              backgroundColor: "var(--page-form-body-background-color)",
              height: "100%",
              borderRadius: 10,
            }}
            justify="center"
            align="top"
          >
            <Col span={24} style={{ padding: "0 20px", paddingBottom: 20 }}>
              <Row justify="center" align="middle" style={{ height: 40 }}>
                <Col>Create Post</Col>
              </Row>
              <Row style={{ background: "#767676", height: 1 }}></Row>
              <Row justify="center" style={{ marginTop: 20 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Type",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select Type ...."
                      onChange={onChangeType}
                      value={type}
                    >
                      <Option value={PostTypes.infoByte}>infoByte</Option>
                      <Option value={PostTypes.notification}>
                        Notification
                      </Option>
                      <Option value={PostTypes.paraphase}>Paraphase</Option>
                      <Option value={PostTypes.codeTip}>Code</Option>
                      <Option value={PostTypes.refactor}>Code-Refactor</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row
                justify="space-between"
                gutter={[10, 10]}
                style={{ marginTop: 20 }}
              >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="source"
                    rules={[
                      {
                        required: true,
                        message: "Please enter source!",
                      },
                    ]}
                  >
                    <Input placeholder={"Source"} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  {!isCode && (
                    <Form.Item
                      name="author"
                      rules={[
                        {
                          required: true,
                          message: "Please enter source!",
                        },
                      ]}
                    >
                      <Input placeholder={"Author"} />
                    </Form.Item>
                  )}
                  {isCode && (
                    <Form.Item
                      name="language"
                      rules={[
                        {
                          required: true,
                          message: "Please enter source!",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Language ...."
                        showSearch={true}
                      >
                        {LanguageList.map((a) => (
                          <Option value={a.value}>{a.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Col>
              </Row>
              <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={isData2Visible ? 12 : 24}
                  xl={isData2Visible ? 12 : 24}
                  style={{ marginTop: 10 }}
                >
                  <Form.Item
                    name="data1"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Type",
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      placeholder={getPlaceholderData1()}
                      maxLength={process.env.REACT_APP_MAX_LENGTH}
                      autoSize={{ minRows: 10, maxRows: 10 }}
                    />
                  </Form.Item>
                </Col>
                {isData2Visible && (
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    style={{ marginTop: 10 }}
                  >
                    <Form.Item
                      name="data2"
                      rules={[
                        {
                          required: true,
                          message: "Text Box Could not be Empty",
                        },
                      ]}
                    >
                      <TextArea
                        showCount
                        placeholder={getPlaceholderData2()}
                        maxLength={process.env.REACT_APP_MAX_LENGTH}
                        autoSize={{ minRows: 10, maxRows: 10 }}
                      />
                    </Form.Item>
                  </Col>
                )}
              </Row>
              <Row align="middle" justify="center" gutter={[10, 10]}>
                <Col
                  xs={24}
                  sm={24}
                  md={isData2Visible ? 12 : 24}
                  lg={isData2Visible ? 12 : 24}
                  xl={isData2Visible ? 12 : 24}
                >
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Post
                    </Button>
                  </Form.Item>
                </Col>
                {isData2Visible && (
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item>
                      <Button type="primary" style={{ width: "100%" }}>
                        Preview
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default function PostNew() {
  const [type, setType] = useState(PostTypes.infoByte);

  const onChangeType = (value) => {
    setType(value);
  };

  return <Post type={type} onChangeType={onChangeType} />;
}

export const PostTypes = {
  infoByte: "InfoByte",
  paraphase: "Paraphase",
  codeTip: "CodeTip",
  refactor: "Refactor",
  notification: "Notification",
};
