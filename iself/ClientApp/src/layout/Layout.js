import React, { Component } from "react";
import { Layout } from "antd";
import NavMenu from "./NavMenu";

const { Content, Footer } = Layout;

export default class AppLayout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <Layout>
        <NavMenu />
        <Content>{this.props.children}</Content>
        <Footer style={{ textAlign: "center" }}>iself@2022</Footer>
      </Layout>
    );
  }
}
