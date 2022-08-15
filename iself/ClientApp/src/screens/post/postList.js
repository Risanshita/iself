import { Button, Col, Row } from "antd";
import { MoreOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useContext, useState } from "react";

import { PostContext } from "../../context/postContext";
import PostPreview from "./preview";
import NoDataFound from "../../components/messages/NoDataFound";
import Loader from "../../components/messages/Loader";

const PostList = ({ postDetails, isProfile, onChange, onLoadMore }) => {
  const { actions, state } = useContext(PostContext);
  const { deletePost } = actions.post;
  const { loading } = state.post;

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
    if (isProfile)
      items.push({
        key: "2",
        label: "Delete",
        icon: <DeleteOutlined />,
        onClick: () => {
          deletePost(post, () => {
            if (typeof onChange === "function") onChange();
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
      {postDetails &&
        postDetails.data &&
        postDetails.data.length > 0 &&
        postDetails.data.map((a) => (
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
                  <Col
                    span={23}
                    style={{ whiteSpace: "nowrap", overflowX: "auto" }}
                  >
                    {a.type}
                    {a.title ? ": " + a.title : ""}
                  </Col>
                  <Col span={1}>
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

                <div className="post-info source">{a.source}</div>
                <div className="post-info author">{a.author}</div>
                <span className="post-info langugae">
                  <Row justify="start" align="middle">
                    {a.language ? (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor:
                            "#" +
                            (((1 << 24) * Math.random()) | 0).toString(16),
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
      <Col span={24}>
        <Row justify="center">
          {loading && <Loader />}
          {postDetails &&
            postDetails.data &&
            postDetails.data.length > 0 &&
            !postDetails.isLast &&
            !loading && (
              <Button style={{ borderRadius: "5px" }} onClick={onLoadMore} type="dashed">
                Load more
              </Button>
            )}
          {(!postDetails ||
            !postDetails.data ||
            postDetails.data.length === 0) &&
            !loading && <NoDataFound />}
        </Row>
      </Col>
      <PostPreview
        post={previewPost}
        afterClose={() => setPreviewPost(undefined)}
      />
    </Row>
  );
};

export default PostList;
