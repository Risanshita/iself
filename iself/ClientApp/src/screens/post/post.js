import { Col, Select, Form, Input, Row, Button, message } from "antd";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { PostContext } from "../../context/postContext";
import LanguageList from "../../utils/LanguageList";
import PostPreview from "./preview";
import "./style.css";

const { Option } = Select;
function Post({ type, onChangeType }) {
  const { actions } = useContext(PostContext);
  const { createPost } = actions.post;
  const [previewPost, setPreviewPost] = useState(undefined);

  const [form] = Form.useForm();
  const isData2Visible =
    type === PostTypes.paraphrase || type === PostTypes.refactor;
  const isCode = type === PostTypes.codeTip || type === PostTypes.refactor;

  const getMessageForData1 = () => {
    switch (type) {
      case PostTypes.paraphrase:
        return "Please enter Incorrect Paraphrase";
      case PostTypes.notification:
        return "Please enter Notification";
      case PostTypes.codeTip:
        return "Please enter code here";
      case PostTypes.refactor:
        return "Please enter code";
      default:
        return "Please enter Info Byte";
    }
  };

  useEffect(
    function () {
      form.setFieldsValue({
        source: "",
        author: "",
        language: undefined,
        data1: "",
        data2: "",
        title: "",
      });
    },
    [type]
  );

  const getPlaceholderData2 = () => {
    return type === PostTypes.paraphrase
      ? "Correct Paraphrase"
      : "Refactored code";
  };

  const getMessageForData2 = () => {
    return type === PostTypes.paraphrase
      ? "Please enter paraphrase"
      : "Please enter refactored code";
  };

  const onPreview = () => {
    setPreviewPost({
      source: form.getFieldValue("source"),
      author: form.getFieldValue("author"),
      language: form.getFieldValue("language"),
      data1: form.getFieldValue("data1"),
      data2: form.getFieldValue("data2"),
      title: form.getFieldValue("title"),
      type: form.getFieldValue("type"),
    });
  };

  const getPlaceholderData1 = () => {
    switch (type) {
      case PostTypes.paraphrase:
        return "Incorrect Paraphrase";
      case PostTypes.notification:
        return "Notification";
      case PostTypes.codeTip:
        return "Code";
      case PostTypes.refactor:
        return "Code";
      default:
        return "Info Byte";
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    createPost(values, () => {
      form.resetFields();
    });
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
                      placeholder="Select Type"
                      onChange={onChangeType}
                      value={type}
                    >
                      <Option
                        key={PostTypes.infoByte}
                        value={PostTypes.infoByte}
                      >
                        infoByte
                      </Option>
                      <Option
                        key={PostTypes.notification}
                        value={PostTypes.notification}
                      >
                        Notification
                      </Option>
                      <Option
                        key={PostTypes.paraphrase}
                        value={PostTypes.paraphrase}
                      >
                        Paraphrase
                      </Option>
                      <Option key={PostTypes.codeTip} value={PostTypes.codeTip}>
                        CodeTip
                      </Option>
                      <Option
                        key={PostTypes.refactor}
                        value={PostTypes.refactor}
                      >
                        Code-Refactor
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {type !== PostTypes.notification && (
                <Row justify="space-between" gutter={[10, 10]}>
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
                            message: "Please enter Author!",
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
                            message: "Select Langauge!",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          placeholder="Select Language"
                          showSearch={true}
                        >
                          {LanguageList.map((a) => (
                            <Option key={a.value} value={a.value}>
                              {a.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              )}
              {isCode && (
                <Row justify="center">
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Please enter title",
                        },
                      ]}
                    >
                      <Input placeholder="Post title"></Input>
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Row gutter={[10, 10]}>
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
                        message: getMessageForData1(),
                      },
                    ]}
                  >
                    <Input.TextArea
                      showCount
                      placeholder={getPlaceholderData1()}
                      maxLength={500}
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
                          message: getMessageForData2(),
                        },
                      ]}
                    >
                      <Input.TextArea
                        showCount
                        placeholder={getPlaceholderData2()}
                        maxLength={500}
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
                      <Button
                        type="primary"
                        style={{
                          width: "100%",
                          border: "none",
                        }}
                        onClick={onPreview}
                      >
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
      <PostPreview
        post={previewPost}
        afterClose={() => setPreviewPost(undefined)}
      />
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
  paraphrase: "Paraphrase",
  codeTip: "CodeTip",
  refactor: "Refactor",
  notification: "Notification",
};
