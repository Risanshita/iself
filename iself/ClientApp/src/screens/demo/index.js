import { Col, Row } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
function Demo() {
  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   deletePost(values, () => {
  //     form.resetFields();
  //   });
  // };
  const menu = (
    <Menu
      style={{ borderRadius: "5px", backgroundColor: "#3E3F47" }}
      items={[
        {
          key: "1",
          label: <DeleteOutlined />,
        },
      ]}
    />
  );

  const myPost = [
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd805",
      title: "",
      type: 0,
      data1: "A room without books is like a body without a soul.",
      data2: "",
      source: "Google",
      author: "Johney deep",
      language: "",
      createdBy: "Nitish K",
      createdAt: "2022-07-24T16:55:19.0763836+05:30",
      updatedBy: "",
      updatedAt: "2022-07-24T16:55:19.0763851+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd806",
      title: "",
      type: 0,
      data1: "sdfsdf",
      data2: "",
      source: "a",
      author: "s",
      language: "",
      createdBy: "",
      createdAt: "2022-07-28T22:04:58.0873326+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T22:04:58.0873349+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd807",
      title: "",
      type: 0,
      data1: "“A room without books is like a body without a soul.”",
      data2: "",
      source: "Google",
      author: "Nitish kumar",
      language: "",
      createdBy: "",
      createdAt: "2022-07-28T22:22:35.9477725+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T22:22:35.9477742+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd808",
      title: "",
      type: 0,
      data1: "sdfsdf",
      data2: "",
      source: "a",
      author: "s",
      language: "",
      createdBy: "",
      createdAt: "2022-07-28T22:25:26.3107471+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T22:25:26.3107489+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd809",
      title: "",
      type: 4,
      data1: "sdd",
      data2: "",
      source: "sds",
      author: "fds",
      language: "",
      createdBy: "",
      createdAt: "2022-07-28T22:25:38.6076392+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T22:25:38.6076407+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd810",
      title: "",
      type: 0,
      data1: "fd",
      data2: "",
      source: "google",
      author: "nk",
      language: "",
      createdBy: "",
      createdAt: "2022-07-28T23:15:49.8922122+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T23:15:49.8923886+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd811",
      title: "",
      type: 4,
      data1: "dsd",
      data2: "",
      source: "",
      author: "",
      language: "",
      createdBy: "",
      createdAt: "2022-07-28T23:15:56.3954904+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T23:15:56.3954913+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd812",
      title: "",
      type: 1,
      data1: "ew",
      data2: "xc",
      source: "sd",
      author: "s",
      language: "",
      createdBy: "",
      createdAt: "2022-07-28T23:16:06.0758185+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T23:16:06.0758304+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd813",
      title: "sd",
      type: 3,
      data1: "sdc",
      data2: "sdc",
      source: "ds",
      author: "",
      language: "abnf",
      createdBy: "",
      createdAt: "2022-07-28T23:16:17.9478949+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T23:16:17.9478969+05:30",
    },
    {
      id: "844ff01b-0560-4d4e-a208-ee12a05cd814",
      title: "dsc",
      type: 2,
      data1: "cds",
      data2: "",
      source: "sdc",
      author: "",
      language: "abnf",
      createdBy: "",
      createdAt: "2022-07-28T23:16:27.3526574+05:30",
      updatedBy: "",
      updatedAt: "2022-07-28T23:16:27.3526599+05:30",
    },
  ];

  return (
    <Row
      className="postnew-page"
      justify="center"
      align="middle"
      style={{ height: "100%", padding: "20px" }}
      gutter={[16, 16]}
    >
      {myPost.map((a) => (
        <Col xs={12} sm={12} md={8} lg={6} xl={6} style={{ height: 248 }}>
          <Row
            style={{
              padding: "10px",
              height: "100%",
              backgroundColor: "#3E3F47",
              borderRadius: 5,
            }}
          >
            <Col span={24} style={{ height: "100%" }}>
              <span className="post-info post-type">{a.type}</span>
              <span className="post-info more-option">
                <Dropdown overlay={menu}>
                  <a /*onClick={onFinish}*/>
                    <Space>
                      <MoreOutlined style={{ color: "white" }} />
                    </Space>
                  </a>
                </Dropdown>
              </span>
              <Row
                className="post-data"
                align="middle"
                justify="center"
                style={{ height: "80%", fontSize: "20px" }}
              >
                {a.data1}
              </Row>
              <span className="post-info by1">{a.createdBy}</span>
              <span className="post-info source">
                <div className="source1">{a.source}</div>
                <div className="author1">{a.author}</div>
              </span>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}
export default Demo;
