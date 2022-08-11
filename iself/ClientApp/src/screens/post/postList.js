import { Col, Row } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useContext } from "react";
import { PostContext } from "../../context/postContext";

const PostList = ({ posts, isDeleteEnabled }) => {
  const { actions } = useContext(PostContext);
  const { loadData, deletePost } = actions.post;

  const menu = (post) => {
    var items = [];
    if (isDeleteEnabled)
      items.push({
        key: "1",
        label: "Delete",
        icon: <DeleteOutlined />,
        onClick: () => {
          deletePost(post, () => {
            loadData();
          });
        },
      });
    return (
      <Menu
        style={{ borderRadius: "5px", backgroundColor: "#3E3F47" }}
        items={items}
      />
    );
  };

  return (
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
                  <Dropdown overlay={menu(a)} placement="bottomRight">
                    <Space>
                      <MoreOutlined
                        style={{ color: "white", cursor: "pointer" }}
                      />
                    </Space>
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

              <span className="post-info createdby">{a.createdBy}</span>
              <div className="post-info source">{a.source}</div>
              <div className="post-info author">{a.author}</div>
              <span className="post-info langugae">
                {/* <span className="language-circle"></span> */}
                <Row justify="start" align="middle">
                  {a.language ? (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          "#" + (((1 << 24) * Math.random()) | 0).toString(16),
                        marginRight: 5,
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {a.language}
                </Row>
              </span>
            </Col>
          </Row>
        </Col>
      ))}
      {posts.length == 0 && <Col span={4}>No post</Col>}
    </Row>
  );
};

export default PostList;
