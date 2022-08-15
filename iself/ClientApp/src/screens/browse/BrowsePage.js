import { Row } from "antd";
import { PostContext } from "../../context/postContext";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import PostList from "../post/postList";
function BrowseList() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const { loadData } = actions.post;
  const { postDetails } = state.post;

  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }

  return (
    <Row
      justify="center"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
      align="top"
    >
      <PostList postDetails={postDetails} />
    </Row>
  );
}
export default BrowseList;
