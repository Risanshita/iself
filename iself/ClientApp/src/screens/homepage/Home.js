import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import NoDataFound from "../../components/messages/NoDataFound";
import { PostContext } from "../../context/postContext";
import { PostTypes } from "../post/post";
import CodeRefactor from "./CodeRefactor";
import CodeTip from "./CodeTip";
import InfoByte from "./InfoByte";
import Notification from "./Notification";
import Paraphrase from "./Paraphrase";

export const HomePage = () => {
  const { state, actions } = useContext(PostContext);
  const { loadData, nextPost, previousPost } = actions.post;
  const { currentPost, posts } = state.post;
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [pressedKey, setPressedKey] = useState(true);
  let screenLock = null;

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

  const isScreenLockSupported = () => {
    return "wakeLock" in navigator;
  };

  const getScreenLock = async () => {
    if (isScreenLockSupported()) {
      try {
        screenLock = await navigator.wakeLock.request("screen");

        screenLock.onrelease = async () => {
          console.log("Lock released 🎈");
          try {
            screenLock = await navigator.wakeLock.request("screen");
          } catch (err) {
            console.log(err.name, err.message);
          }
        };
      } catch (err) {
        console.log(err.name, err.message);
      }
      return screenLock;
    }
  };

  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
    getScreenLock();
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

  document.addEventListener("visibilitychange", async (a) => {
    console.log("Visibilitychange 🎈", a);
  });

  return (
    <Row style={{ height: "100%" }} className="prevent-select">
      {currentPost && (
        <Col span={24} style={{ height: "100%", padding: 20 }}>
          {currentPost.type === PostTypes.infoByte && (
            <InfoByte post={currentPost} />
          )}
          {currentPost.type === PostTypes.paraphrase && (
            <Paraphrase post={currentPost} />
          )}
          {currentPost.type === PostTypes.codeTip && (
            <CodeTip post={currentPost} />
          )}
          {currentPost.type === PostTypes.refactor && (
            <CodeRefactor post={currentPost} />
          )}
          {currentPost.type === PostTypes.notification && (
            <Notification post={currentPost} />
          )}
        </Col>
      )}
      {!currentPost && <NoDataFound />}
    </Row>
  );
};
