import { Col, Row, Button, Input } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useEffect, useState } from "react";

const customIcons = [
  <FrownOutlined />,
  <FrownOutlined />,
  <MehOutlined />,
  <SmileOutlined />,
  <SmileOutlined />,
];
const animationPics = [
  "https://assets10.lottiefiles.com/packages/lf20_lt5xlugl.json",
  "https://assets10.lottiefiles.com/packages/lf20_NBpLbW.json",
  "https://assets10.lottiefiles.com/packages/lf20_FyWhBU.json",
  "https://assets10.lottiefiles.com/packages/lf20_4hzghz6e.json",
  "https://assets10.lottiefiles.com/packages/lf20_Mq35jq.json",
];
function RateUs() {
  const [ratevalue, setratevalue] = useState(5);
  const [animationUrl, setAnimationUrl] = useState(animationPics[4]);
  const [rateText, setRateText] = useState("");
  function onChangeText(text) {
    setRateText(text.currentTarget.value);
  }
  function onClickSend() {
    console.log("Rating value : " + ratevalue);
    console.log("Rating Text : " + rateText);
  }
  function Onhover(index) {
    if (index !== undefined) setratevalue(index);
  }

  useEffect(() => {
    if (ratevalue !== undefined) {
      setAnimationUrl(animationPics[ratevalue - 1]);
    }
  }, [ratevalue]);

  return (
    <Row
      justify="center"
      align="middle"
      style={{ width: "100%", height: "100%" }}
    >
      <Col
        xs={22}
        sm={22}
        md={18}
        lg={12}
        xl={12}
        style={{
          backgroundColor: "#2C2C33",
          height: "530px",
          borderRadius: "10px",
        }}
      >
        <Row
          justify="center"
          align="middle"
          style={{ width: "100%", marginTop: "10px" }}
        >
          Rate Us
        </Row>
        <Row justify="center" align="middle" style={{ width: "100%" }}>
          <div
            className="rateReaction"
            style={{
              //   backgroundColor: "white",
              borderRadius: "50%",
              height: "300px",
              width: "300px",
            }}
          >
            <Player
              autoplay
              loop
              src={animationUrl}
              style={{ height: "300px", width: "300px" }}
            >
              {/* <Controls
              visible={true}
              buttons={["play", "repeat", "frame", "debug"]}
            /> */}
            </Player>
          </div>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{ width: "100%", margin: "10px 0px" }}
        >
          <Rate
            onHoverChange={Onhover}
            value={ratevalue}
            character={({ index }) => customIcons[index]}
            style={{ fontSize: 36 }}
          />
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{ width: "100%", height: "auto" }}
        >
          <Input.TextArea
            onChange={onChangeText}
            style={{ width: "90%" }}
            placeholder="Write feedback here"
            autoSize={{ minRows: 2, maxRows: 2 }}
          />
        </Row>
        <Row
          justify="space-between"
          align="middle"
          style={{ width: "100%", padding: "5px 20px" }}
        >
          <Button type="text" style={{ color: "#5B0EEB" }}>
            Not now
          </Button>
          <Button
            type="primary"
            onClick={onClickSend}
            style={{
              backgroundColor: "#5B0EEB",
              padding: "0px 10%",
              borderRadius: "10px",
              border: "none",
            }}
          >
            Send
          </Button>
        </Row>
      </Col>
    </Row>
  );
}
export default RateUs;
