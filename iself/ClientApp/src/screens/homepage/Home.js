import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/postContext";
import Textfit from "../../utils/Textfit";
import InfoByte from "./InfoByte";

export const HomePage = () => {
  const { state, actions } = useContext(PostContext);
  const { loadData, nextPost } = actions.post;
  const { currentPost, posts } = state.post;
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        nextPost();
      },
      posts && Array.isArray(posts) && posts.length > 0 && currentPost
        ? process.env.REACT_APP_POST_CHANGE_DELAY * 1000
        : 100
    );
  }, [currentPost, posts, nextPost]);

  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }

  return (
    <Row style={{ height: "100%" }} className="prevent-select">
      {currentPost && (
        <Col span={24} style={{ height: "100%", padding: 20 }}>
          <InfoByte post={currentPost} />
        </Col>
      )}
      {!currentPost && <Col>No post available</Col>}
    </Row>
  );
};
