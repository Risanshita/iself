import { Col, Row } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { PostContext } from "../../context/postContext";
import { useContext, useState } from "react";
import ProfileHeader from "./profilehead";
function Profile() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const { loadData, deletePost } = actions.post;
  const { posts } = state.post;


  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }

  const menu = (post) => {
    return (
      <Menu
        style={{ borderRadius: "5px", backgroundColor: "#3E3F47" }}
        items={[
          {
            key: "1",
            label: <DeleteOutlined />,
            onClick: () => {
              deletePost(post, () => {
                loadData();
              });
            },
          },
        ]}
      />
    );
  };

  return (
    <Row
      // className="postnew-page"
      justify="center"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
    >
      <ProfileHeader />
      <Row
        align="middle"
        justify="center"
        style={{
          // backgroundColor: "#3E3F47",
          width: "100%",
          borderRadius: "10px",
          margin: "10px 0",
        }}
      >
        <Col style={{ padding: "10px" }}>Your Posts</Col>
      </Row>
      <Row style={{ width: "100%" }}>
        {posts.map((a) => (
          <Col
            xs={12}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            style={{ height: 248, padding: 7 }}
          >
            <Row
              style={{
                padding: "10px",
                height: "100%",
                backgroundColor: "#3E3F47",
                borderRadius: 5,
              }}
            >
              <Col span={24} style={{ height: "100%" }}>
                <Row justify="space-between">
                  <Col>{a.type}</Col>
                  <Col>
                    <Dropdown overlay={menu(a)}>
                      <a /*onClick={onFinish}*/>
                        <Space>
                          <MoreOutlined style={{ color: "white" }} />
                        </Space>
                      </a>
                    </Dropdown>
                  </Col>
                </Row>
                {/* <span className="post-info post-type"></span>
                <span className="post-info more-option"></span> */}
                <Row
                  className="post-data"
                  align="middle"
                  justify="center"
                  style={{
                    height: "80%",
                    padding: "10px 0px",
                    fontSize: "20px",
                    overflowY: "auto",
                  }}
                >
                  {a.data1}
                </Row>

                <span className="post-info by1">{a.createdBy}</span>
                <span className="post-info source">
                  <div className="source1">{a.source}</div>
                  <div className="author1">{a.author}</div>
                </span>
                <span className="post-info by1">
                  {/* <span className="language-circle"></span> */}
                  {a.language}
                </span>
              </Col>
            </Row>
          </Col>
        ))}
        {posts.length == 0 && <Col span={4}>No post</Col>}
      </Row>
    </Row>
  );
}
export default Profile;
