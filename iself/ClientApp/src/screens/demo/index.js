import React, { Component } from "react";
import { PostProvider } from "../../context/postContext";
import Demo from "./DemoScreen";

export const DemoScreen = () => {
  return (
    <PostProvider>
      <Demo />
    </PostProvider>
  );
};
