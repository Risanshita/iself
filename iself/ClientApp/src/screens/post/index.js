import { Col, Select, Form, Input, Row, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
const { Option } = Select;
function Post({ type, onChangeType }) {
  const isData2Visible =
    type === PostTypes.paraphase || type === PostTypes.refactor;

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
        {/* <h1>Hello</h1> */}
        <Row
          style={{
            backgroundColor: "var(--page-form-body-background-color)",
            height: "100%",
            borderRadius: 10,
          }}
          justify="center"
          align="top"
        >
          <Col span={24} style={{ padding: "0 20px" }}>
            <Row justify="center" align="middle" style={{ height: 40 }}>
              <Col>Create Post</Col>
            </Row>
            <Row style={{ background: "#767676", height: 1 }}></Row>
            <Row justify="center" style={{ marginTop: 20 }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Type ...."
                  onChange={onChangeType}
                  value={type}
                >
                  <Option value={PostTypes.infoByte}>infoByte</Option>
                  <Option value={PostTypes.notification}>Notification</Option>
                  <Option value={PostTypes.paraphase}>Paraphase</Option>
                  <Option value={PostTypes.codeTip}>Code</Option>
                  <Option value={PostTypes.refactor}>Code-Refactor</Option>
                </Select>
              </Col>
            </Row>
            <Row
              justify="space-between"
              gutter={[10, 10]}
              style={{ marginTop: 20 }}
            >
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Input placeholder={"Source"} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Input placeholder={"Author"} />
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
                <TextArea
                  name="data1"
                  showCount
                  placeholder={getPlaceholderData1()}
                  maxLength={process.env.REACT_APP_MAX_LENGTH}
                  autoSize={{ minRows: 10, maxRows: 10 }}
                />
              </Col>
              {isData2Visible && (
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginTop: 10 }}
                >
                  <TextArea
                    showCount
                    placeholder={getPlaceholderData2()}
                    maxLength={process.env.REACT_APP_MAX_LENGTH}
                    autoSize={{ minRows: 10, maxRows: 10 }}
                  />
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
                style={{ marginTop: 10 }}
              >
                <Button type="primary" style={{ width: "100%" }}>
                  Post
                </Button>
              </Col>
              {isData2Visible && (
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginTop: 10 }}
                >
                  <Button type="primary" style={{ width: "100%" }}>
                    Preview
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
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
