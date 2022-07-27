import React, { Component } from "react";
import { Col, Layout, Row } from "antd";
import NavMenu from "./NavMenu";
import "./Style.css";

const { Content, Footer } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout>
      <NavMenu key="app_nav_menu" />
      <Content className="body" id="app_body">
        {children}
      </Content>
      <Footer className="footer">
        <Row style={{ height: "100%" }} justify="center" align="middle">
          <Col>iself@2022</Col>
        </Row>
      </Footer>
    </Layout>
  );
}
