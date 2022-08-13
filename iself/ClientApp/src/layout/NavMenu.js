import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Col, Layout, Image, Row } from "antd";
import browse from "../assets/images/browse.png";
import home from "../assets/images/home.png";
import eye from "../assets/images/eye.png";
import avtar from "../assets/images/avtar.jpg";
import { Player } from "@lottiefiles/react-lottie-player";
import add from "../assets/images/add.png";
import signout from "../assets/images/signout.png";

import postnew from "../assets/animatedIcons/postnew.json";
import eyelogo from "../assets/animatedIcons/eye.json";
import homelogo from "../assets/animatedIcons/home.json";
import browselogo from "../assets/animatedIcons/browse.json";
import loginlogo from "../assets/animatedIcons/login.json";
import addnewlogo from "../assets/animatedIcons/add.json";
import {
  SmileOutlined,
  LogoutOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
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
      link: "/signup",
      label: (
        <NavLink tag={Link} to="/signup">
          <ScheduleOutlined />
          <span className="menu-label">Sign UP</span>
        </NavLink>
      ),
    },
    {
      link: "/notfound",
      label: (
        <NavLink tag={Link} to="/notfound">
          <ScheduleOutlined />
          <span className="menu-label">Not Found</span>
        </NavLink>
      ),
    },
    {
      link: "/demoscreen",
      label: (
        <NavLink tag={Link} to="/demoscreen">
          <ScheduleOutlined />
          <span className="menu-label">demoscreen</span>
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
      <Row
        style={{ height: "100%", padding: "0px 10px" }}
        align="middle"
        justify="space-between"
      >
        <Row justify="center" align="middle" style={{ height: "100%" }}>
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
                style={{ backgroundColor: "transparent" }}
              >
                <Player
                  autoplay
                  loop
                  src={postnew}
                  style={{ height: "34px", width: "70px" }}
                ></Player>

                {/* <Image width={17} preview={false} src={add} /> */}
                {/* <Row>
                  <Player
                    autoplay
                    loop
                    src={addnewlogo}
                    style={{ height: "25px", width: "25px" }}
                  ></Player>
                  <span className="menu-label">POST</span>
                </Row> */}
              </NavLink>
            )}
            {login && (
              // <Tooltip title="profile">
              <NavLink to="/profile" tag={Link}>
                <Button
                  // onClick={profileClick()}
                  style={{
                    margin: "0px 5px",
                    // backgroundColor: "var(--ant-primary-color)",
                  }}
                  shape="circle"
                  size="35"
                  icon={
                    <Image width={30} height={30} preview={false} src={avtar} />
                  }
                />
              </NavLink>
              // </Tooltip>
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
