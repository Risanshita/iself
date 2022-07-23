import React, { useEffect, useState } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "./NavMenu.css";
import { Col, Layout, Menu, Row } from "antd";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
const { Header } = Layout;

const NavMenu = () => {
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const menuList = [
    {
      link: "/",
      label: (
        <NavLink tag={Link} to="/">
          <HomeOutlined />
          <span className="menu-label">Line</span>
        </NavLink>
      ),
    },
    {
      link: "/counter",
      label: (
        <NavLink tag={Link} to="/counter">
          <HomeOutlined />
          <span className="menu-label">Line Correction</span>
        </NavLink>
      ),
    },
    {
      link: "/fetch-data",
      label: (
        <NavLink tag={Link} to="/fetch-data">
          <HomeOutlined />
          <span className="menu-label">Code</span>
        </NavLink>
      ),
    },
    {
      link: "/login",
      label: (
        <NavLink tag={Link} to="/login">
          <HomeOutlined />
          <span className="menu-label">Code Correction</span>
        </NavLink>
      ),
    },
  ];
  return (
    <Header
      className="header"
      style={{
        // position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Row style={{ height: "100%" }} align="middle" justify="space-between">
        <Col className="logo">ISELF</Col>
        <Col>
          <Row className="menu-list" align="middle">
            {menuList.map((a) => {
              return (
                <Col className={a.link === path ? "active" : ""}>{a.label}</Col>
              );
            })}
          </Row>
        </Col>
        <Col>
          <Row align="middle">
            <NavLink tag={Link} to="/logout">
              <UploadOutlined />
            </NavLink>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default NavMenu;
