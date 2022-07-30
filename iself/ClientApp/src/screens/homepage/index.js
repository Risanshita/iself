import React, { Component } from "react";
import { PostProvider } from "../../context/postContext";
import { HomePage } from "./Home";
import "./Style.css";

export const HomeScreen = () => {
  return (
    <PostProvider>
      <HomePage />
    </PostProvider>
  );
};
