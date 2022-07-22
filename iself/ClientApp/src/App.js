import "./custom.css";
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./layout";
import { ConfigProvider } from "antd";

export default class App extends Component {
  static displayName = App.name;
  state = { isInitialLoad: true };
  constructor() {
    super();
    ConfigProvider.config({
      theme: {
        primaryColor: "#4361EE",
        errorColor: "#ff4d4f",
        warningColor: "#faad14",
        successColor: "#52c41a",
        infoColor: "#1890ff",
      },
    });
  }
  render() {
    return (
      <ConfigProvider componentSize="large">
        <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      </ConfigProvider>
    );
  }
}
