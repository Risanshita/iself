import { Row } from "antd";
import React, { Component } from "react";
import { PostProvider } from "../../context/postContext";
import PostNew from "./post";

const PostScreen = () => {
  return (
    <PostProvider>
      <PostNew />
    </PostProvider>
  );
};
export default PostScreen;
