import React, { Component } from "react";
import { PostProvider } from "../../context/postContext";
import Profile from "./profile";

export const ProfileScreen = () => {
  return (
    <PostProvider>
      <Profile />
    </PostProvider>
  );
};
