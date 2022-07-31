import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/postContext";
import { PostTypes } from "../post/post";
import CodeRefactor from "./CodeRefactor";
import CodeTip from "./CodeTip";
import InfoByte from "./InfoByte";
import Paraphrase from "./Paraphrase";

export const HomePage = () => {
  const { state, actions } = useContext(PostContext);
  const { loadData, nextPost, previousPost } = actions.post;
  const { currentPost, posts } = state.post;
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [pressedKey, setPressedKey] = useState(true);

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

    // document.addEventListener("keypress", (e) => {
    //   setPressedKey(e.key.toLocaleLowerCase());
    // });
  }

  useEffect(() => {
    console.log(pressedKey);
    if (pressedKey === "p") {
      previousPost();
    }
    if (pressedKey === "n") {
      nextPost();
    }
    setPressedKey(undefined);
  }, [pressedKey]);

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
          {currentPost.type === PostTypes.refactor && (
            <CodeRefactor post={currentPost} />
          )}
        </Col>
      )}
      {!currentPost && <Col>No post available</Col>}
    </Row>
  );
};
