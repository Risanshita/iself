import { Col, Row } from "antd";
import React, { useContext, useState } from "react";
import { PostContext } from "../../context/postContext";
import React, { Component, useContext, useEffect, useState } from "react";
import CodeTip from "./CodeTip";
import InfoByte from "./InfoByte";

export const HomePage = () => {
  const { state, actions } = useContext(PostContext);
  const { loadData, start } = actions.post;
  const { currentPost, posts } = state.post;
  const [isInitialLoad, setInitialLoad] = useState(true);

  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }
  useEffect(() => {
    start(posts);
  }, [posts, start]);

  return (
    <Row style={{ height: "100%" }}>
      {currentPost && (
        <Col span={24} style={{ height: "100%", padding: 20 }}>
          <InfoByte post={currentPost} />
          <span className="post-info by">{currentPost.createdBy}</span>
          <span className="post-info source">
            <div className=" author">{currentPost.source}</div>
            <div className=" author">{currentPost.author}</div>
          </span>
        </Col>
      )}
    </Row>
  );
};
