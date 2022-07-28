import { Row } from "antd";
import React, { Component } from "react";
import PostNew from "./post";
import { PostProvider } from "./state";

const PostScreen = () => {
  return (
    <PostProvider>
      <PostNew />
    </PostProvider>
  );
};
export default PostScreen;
