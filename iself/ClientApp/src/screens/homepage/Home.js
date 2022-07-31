import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/postContext";
import { PostTypes } from "../post/post";
import CodeTip from "./CodeTip";
import InfoByte from "./InfoByte";
import Paraphrase from "./Paraphrase";

export const HomePage = () => {
  const { state, actions } = useContext(PostContext);
  const { loadData, nextPost } = actions.post;
  const { currentPost, posts } = state.post;
  const [isInitialLoad, setInitialLoad] = useState(true);

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
          {currentPost.type === PostTypes.infoByte && (
            <InfoByte post={currentPost} />
          )}
          {currentPost.type === PostTypes.paraphase && (
            <Paraphrase post={currentPost} />
          )}
          {currentPost.type === PostTypes.codeTip && (
            <CodeTip post={currentPost} />
          )}
        </Col>
      )}
      {!currentPost && <Col>No post available</Col>}
    </Row>
  );
};
