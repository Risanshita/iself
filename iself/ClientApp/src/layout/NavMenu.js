import { Button, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Col, Layout, Image, Row } from "antd";
import person from "../assets/images/person.png";
import {
  SmileOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  IssuesCloseOutlined,
  ScheduleOutlined,
  ProfileOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { AccountContext } from "../context/accountContext";
const { Header } = Layout;

const NavMenu = () => {
  function profileClick() {
    <NavLink tag={Link} to="/profile"></NavLink>;
  }
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);

  const { state, actions } = useContext(AccountContext);
  const { logout } = actions.account;
  const { login } = state.account;

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const menuList = [
    {
      link: "/",
      label: (
        <NavLink tag={Link} to="/">
          <HomeOutlined />
          <span className="menu-label">Home</span>
        </NavLink>
      ),
    },
    {
      link: "/line",
      label: (
        <NavLink tag={Link} to="/line">
          <InfoCircleOutlined />
          <span className="menu-label">Line</span>
        </NavLink>
      ),
    },
    {
      link: "/paraphrase",
      label: (
        <NavLink tag={Link} to="/counter">
          <IssuesCloseOutlined />
          <span className="menu-label">Paraphrase</span>
        </NavLink>
      ),
    },
    {
      link: "/fetch-data",
      label: (
        <NavLink tag={Link} to="/fetch-data">
          <ProfileOutlined />
          <span className="menu-label">Code</span>
        </NavLink>
      ),
    },
    {
      link: "/login",
      label: (
        <NavLink tag={Link} to="/login">
          <ScheduleOutlined />
          <span className="menu-label">Code Correction</span>
        </NavLink>
      ),
    },
    {
      link: "/profile",
      label: (
        <NavLink tag={Link} to="/profile">
          <ScheduleOutlined />
          <span className="menu-label">Profile</span>
        </NavLink>
      ),
    },
  ];

  return (
    <Header
      className={login ? "header login" : "header"}
      style={{
        // position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
      key="header"
    >
      <Row style={{ height: "100%" }} align="middle" justify="space-between">
        <Col className="logo">ISELF</Col>

        <Col>
          <Row className="menu-list" align="middle">
            {menuList.map((a, index) => {
              return (
                <Col
                  key={"menu_item" + index}
                  className={a.link === path ? "active" : ""}
                >
                  {a.label}
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col>
          <Row align="middle">
            {login && (
              <NavLink to="/post" className="custom-primary-button" tag={Link}>
                <PlusOutlined />
                <div className="menu-label">POST</div>
              </NavLink>
            )}
            {
              login && (
                <Tooltip title="profile">
                  <Button
                    onClick={profileClick()}
                    style={{ margin: "0px 5px", backgroundColor: "#4361EE" }}
                    shape="circle"
                    size="35"
                    icon={<SmileOutlined />}
                  />
                </Tooltip>
              )
              // <NavLink onClick={logout}>
              //   <LogoutOutlined />
              //   <span className="menu-label">Logout</span>
              // </NavLink>
            }
            {!login && (
              <NavLink tag={Link} to="/login">
                <LoginOutlined />
                <span className="menu-label">Login</span>
              </NavLink>
            )}
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default NavMenu;
