import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Col, Layout, Image, Row } from "antd";

import eye from "../assets/images/eye.png";
import avtar from "../assets/images/avtar.jpg";
import { Player } from "@lottiefiles/react-lottie-player";
import postnew from "../assets/animatedIcons/postnew.json";
import loginlogo from "../assets/animatedIcons/login.json";
import browselogo from "../assets/animatedIcons/browse.json";
import homelogo from "../assets/animatedIcons/home.json";
import { AccountContext } from "../context/accountContext";

const { Header } = Layout;

const NavMenu = () => {
  // function profileClick() {
  //   <NavLink tag={Link} to="/profile"></NavLink>;
  // }
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const { state } = useContext(AccountContext);
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
          {/* <Image width={17} preview={false} src={home} /> */}
          <Row>
            <Player
              hover={true}
              loop
              src={homelogo}
              style={{ height: "20px", width: "17px" }}
            ></Player>
            <span className="menu-label">Home</span>
          </Row>
        </NavLink>
      ),
    },
    {
      link: "/fetch-data",
      label: (
        <NavLink tag={Link} to="/browse">
          <Row>
            <Player
              hover={true}
              loop
              src={browselogo}
              style={{ height: "25px", width: "20px" }}
            ></Player>
            <span className="menu-label">Browse</span>
          </Row>
        </NavLink>
      ),
    },
    {
      link: "/demoscreen",
      label: (
        <NavLink tag={Link} to="/demoscreen">
          <span className="menu-label">demoscreen</span>
        </NavLink>
      ),
    },
  ];

  return (
    <Header
      className={login ? "header login" : "header"}
      style={{
        zIndex: 1,
        width: "100%",
      }}
      key="header"
    >
      <Row
        style={{ height: "100%" }}
        align="middle"
        justify="space-between"
        className="header-wrapper"
      >
        <Row
          justify="center"
          align="middle"
          style={{ height: "100%" }}
          className="prevent-select"
        >
          <Image width={30} preview={false} src={eye} />
          <Col className="logo">ISELF</Col>
        </Row>

        <Col>
          <Row className="menu-list" align="middle">
            {menuList.map((a, index) => {
              return (
                <Col
                  key={"menu_item_" + index}
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
                style={{ backgroundColor: "transparent", padding: 0 }}
              >
                <Player
                  autoplay
                  loop
                  src={postnew}
                  style={{
                    height: window.innerWidth > 767 ? 35 : 30,
                    width: window.innerWidth > 767 ? 70 : 60,
                  }}
                />
              </NavLink>
            )}
            {login && (
              <NavLink to="/profile" tag={Link} style={{ padding: 0 }}>
                <Button
                  // style={{
                  //   margin: "0px 5px",
                  // }}
                  shape="circle"
                  size={window.innerWidth > 767 ? 28 : 22}
                  icon={
                    <Image
                      width={window.innerWidth > 767 ? 28 : 22}
                      height={window.innerWidth > 767 ? 28 : 22}
                      preview={false}
                      src={avtar}
                    />
                  }
                />
              </NavLink>
            )}
            {!login && (
              <NavLink tag={Link} to="/login">
                <Row justify="center" align="middle">
                  <Player
                    hover={true}
                    loop
                    src={loginlogo}
                    style={{ height: "34px", width: "35px" }}
                  ></Player>
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
