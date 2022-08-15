import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/messages/Loader";
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
  const { loadHomeData, nextPost } = actions.post;
  const { currentPost, postDetails, loading } = state.post;
  const [isInitialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setTimeout(
      () => {
        nextPost();
      },
      postDetails &&
        postDetails.data &&
        Array.isArray(postDetails.data) &&
        postDetails.data.length > 0 &&
        currentPost
        ? process.env.REACT_APP_POST_CHANGE_DELAY * 1000
        : 100
    );
  }, [currentPost, postDetails, nextPost]);

  if (isInitialLoad) {
    loadHomeData();
    setInitialLoad(false);

    setTimeout(() => {
      var elem = document.getElementById("home_page_post");
      if (elem)
        elem.ondblclick = function () {
          if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
          ) {
            closeFullscreen();
          } else openFullscreen();
        };
    }, 5000);
  }

  const openFullscreen = () => {
    var elem = document.getElementById("home_page_post");
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  };

  return (
    <Row
      style={{ height: "100%" }}
      className="prevent-select"
      id="home_page_post"
    >
      {currentPost ? (
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
      ) : !loading ? (
        <NoDataFound />
      ) : null}
      {loading && (
        <Row
          style={{ height: "100%", width: "100%" }}
          justify="center"
          align="middle"
        >
          <Loader />
        </Row>
      )}
      {}
    </Row>
  );
};
