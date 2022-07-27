import { Row } from "antd";
import React, { Component } from "react";
import { HomePage } from "./Home";
import { HomeProvider } from "./state";
import "./Style.css";

export const HomeScreen = () => {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
};
