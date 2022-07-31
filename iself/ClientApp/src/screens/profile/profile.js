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

      <PostList posts={posts} />
    </Row>
  );
}
export default Profile;
