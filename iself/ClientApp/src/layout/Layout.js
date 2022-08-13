import React, { Component, useState } from "react";
import { Col, Layout, Row } from "antd";
import NavMenu from "./NavMenu";
import "./Style.css";

const { Content, Footer } = Layout;

export default function AppLayout({ children }) {
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [footerVisibility, setFooterVisibility] = useState(true);
  if (isInitialLoad) {
    setTimeout(() => {
      setFooterVisibility(false);
    }, 10000);
    setInitialLoad(false);
  }
  return (
    <Layout>
      <NavMenu key="app_nav_menu" />
      <Content className="body" id="app_body">
        {children}
      </Content>
      {footerVisibility && (
        <Footer className="footer">
          <Row style={{ height: "100%" }} justify="center" align="middle">
            <Col>iself@2022</Col>
          </Row>
        </Footer>
      )}
    </Layout>
  );
}
