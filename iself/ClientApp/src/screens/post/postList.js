import { Col, Row } from "antd";
import { MoreOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useContext, useState } from "react";
import { PostContext } from "../../context/postContext";
import PostPreview from "./preview";
import NoDataFound from "../../components/messages/NoDataFound";

const PostList = ({ posts, isDeleteEnabled }) => {
  const { actions } = useContext(PostContext);
  const { loadData, deletePost } = actions.post;
  const [previewPost, setPreviewPost] = useState(undefined);

  const menu = (post) => {
    var items = [
      {
        key: "1",
        label: "View",
        icon: <EyeOutlined />,
        onClick: () => {
          setPreviewPost(post);
        },
      },
    ];
    if (isDeleteEnabled)
      items.push({
        key: "2",
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
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          style={{ height: 248, padding: 7 }}
          key={a.id}
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
                <Row>
                  {a.type} - {a.title}
                </Row>
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
                  fontSize: "16px",
                  overflowY: "auto",
                }}
              >
                {a.data1}
              </Row>

              <span className="post-info createdby">{a.ownerName}</span>
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
      {posts.length === 0 && <NoDataFound />}
      <PostPreview
        post={previewPost}
        afterClose={() => setPreviewPost(undefined)}
      />
    </Row>
  );
};

export default PostList;
