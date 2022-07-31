import { Col, Row } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { PostContext } from "../../context/postContext";
import { useContext, useState } from "react";
import ProfileHeader from "./profilehead";
import "./style.css";
import PostList from "../post/postList";
function Profile() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const { loadData, deletePost } = actions.post;
  const { posts } = state.post;

  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }


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
      <PostList posts={posts} />
    </Row>
  );
}
export default Profile;
