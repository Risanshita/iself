import React from "react";
import { PostProvider } from "../../context/postContext";
import BrowseList from "./BrowsePage";

const BrowseScreen = () => {
  return (
    <PostProvider>
      <BrowseList />
    </PostProvider>
  );
};

export default BrowseScreen;
