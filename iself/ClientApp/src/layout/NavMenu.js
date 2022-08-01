import { Button, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Col, Layout, Image, Row } from "antd";
import code from "../assets/images/code.png";
import browse from "../assets/images/browse.png";
import home from "../assets/images/home.png";
import eye from "../assets/images/eye.png";
import add from "../assets/images/add.png";
// import code from "../assets/images/infobyte.png";
import infobyte from "../assets/images/infobyte.png";
import refactor from "../assets/images/refactor.png";
import signout from "../assets/images/signout.png";
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
  // function profileClick() {
  //   <NavLink tag={Link} to="/profile"></NavLink>;
  // }
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
          {/* <HomeOutlined /> */}
          <Image width={17} preview={false} src={home} />
          <span className="menu-label">Home</span>
        </NavLink>
      ),
    },
    // {
    //   link: "/line",
    //   label: (
    //     <NavLink tag={Link} to="/line">
    //       <Image width={17} preview={false} src={infobyte} />
    //       <span className="menu-label">Line</span>
    //     </NavLink>
    //   ),
    // },
    // {
    //   link: "/paraphrase",
    //   label: (
    //     <NavLink tag={Link} to="/counter">
    //       <Image width={17} preview={false} src={home} />
    //       <span className="menu-label">Paraphrase</span>
    //     </NavLink>
    //   ),
    // },
    // {
    //   link: "/fetch-data",
    //   label: (
    //     <NavLink tag={Link} to="/fetch-data">
    //       <Image width={17} preview={false} src={code} />
    //       <span className="menu-label">Code</span>
    //     </NavLink>
    //   ),
    // },
    // {
    //   link: "/fetch-data",
    //   label: (
    //     <NavLink tag={Link} to="/fetch-data">
    //       <Image width={17} preview={false} src={refactor} />
    //       <span className="menu-label">Refactor</span>
    //     </NavLink>
    //   ),
    // },
    {
      link: "/fetch-data",
      label: (
        <NavLink tag={Link} to="/browse">
          <Image width={17} preview={false} src={browse} />
          <span className="menu-label">Browse</span>
        </NavLink>
      ),
    },
    // {
    //   link: "/login",
    //   label: (
    //     <NavLink tag={Link} to="/login">
    //       <ScheduleOutlined />
    //       <span className="menu-label">Code Correction</span>
    //     </NavLink>
    //   ),
    // },
    // {
    //   link: "/profile",
    //   label: (
    //     <NavLink tag={Link} to="/profile">
    //       <ScheduleOutlined />
    //       <span className="menu-label">Profile</span>
    //     </NavLink>
    //   ),
    // },
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
      <Row
        style={{ height: "100%", padding: "0px 10px" }}
        align="middle"
        justify="space-between"
      >
        <Row justify="center" align="middle">
          <Image width={30} preview={false} src={eye} />
          <Col className="logo">ISELF</Col>
        </Row>

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
          <Row align="middle" justify="center">
            {login && (
              <NavLink
                to="/post"
                className="custom-primary-button"
                tag={Link}
                style={{ backgroundColor: "#FFB800" }}
              >
                <Image width={17} preview={false} src={add} />
                <div className="menu-label">POST</div>
              </NavLink>
            )}
            {
              login && (
                // <Tooltip title="profile">
                <NavLink to="/profile" tag={Link}>
                  <Button
                    // onClick={profileClick()}
                    style={{
                      margin: "0px 5px",
                      backgroundColor: "var(--ant-primary-color)",
                    }}
                    shape="circle"
                    size="35"
                    icon={<SmileOutlined />}
                  />
                </NavLink>
                // </Tooltip>
              )
              // <NavLink onClick={logout}>
              //   <LogoutOutlined />
              //   <span className="menu-label">Logout</span>
              // </NavLink>
            }
            {!login && (
              <NavLink tag={Link} to="/login">
                <Row justify="center" align="middle">
                  <Image width={17} preview={false} src={signout} />
                  <span className="menu-label">Login</span>
                </Row>
              </NavLink>
            )}
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default NavMenu;
