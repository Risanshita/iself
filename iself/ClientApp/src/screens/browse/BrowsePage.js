import { Row } from "antd";
import { PostContext } from "../../context/postContext";
import { useContext, useState } from "react";
import "./style.css";
import PostList from "../post/postList";
function BrowseList() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const { loadData } = actions.post;
  const { posts } = state.post;

  function onSelectType() {}
  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }

  onSelectType = (e, { value }) => {
    loadData("", "", value);
  };

  return (
    <Row
      // className="postnew-page"
      justify="center"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
    >
      <PostList posts={posts} />
    </Row>
  );
}
export default BrowseList;
