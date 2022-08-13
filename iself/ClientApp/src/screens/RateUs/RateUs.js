import { Col, Row, Button, Input } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/accountContext";

import rating1 from "../../assets/animatedIcons/rating1.json";
import rating2 from "../../assets/animatedIcons/rating2.json";
import rating3 from "../../assets/animatedIcons/rating3.json";
import rating4 from "../../assets/animatedIcons/rating4.json";
import rating5 from "../../assets/animatedIcons/rating5.json";
const customIcons = [
  <FrownOutlined />,
  <FrownOutlined />,
  <MehOutlined />,
  <SmileOutlined />,
  <SmileOutlined />,
];
const animationPics = [rating1, rating2, rating3, rating4, rating5];
function RateUs() {
  const [rateValue, setRateValue] = useState(5);
  const [animationUrl, setAnimationUrl] = useState(animationPics[4]);
  const [rateText, setRateText] = useState("");
  const [isSubmitted, setSubmit] = useState(false);

  const { actions } = useContext(AccountContext);
  const { submitFeedback } = actions.account;

  function onChangeText(text) {
    setRateText(text.currentTarget.value);
  }

  function onClickSend() {
    submitFeedback({ Rating: rateValue, FeedbackMessage: rateText });
    setSubmit(true);
  }

  function Onhover(index) {
    if (index !== undefined) setRateValue(index);
  }

  useEffect(() => {
    if (rateValue !== undefined) {
      setAnimationUrl(animationPics[rateValue - 1]);
    }
  }, [rateValue]);

  return (
    <Row
      justify="center"
      align="middle"
      style={{ width: "100%", height: "100%" }}
    >
      {isSubmitted && (
        <Col style={{ fontSize: "40px" }}>Thanks for your time!</Col>
      )}
      {!isSubmitted && (
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
                style={{ height: "250px", width: "250px" }}
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
            style={{
              width: "100%",
              margin: "10px 0px",
              position: "relative",
              top: "-50px",
            }}
          >
            <Rate
              onHoverChange={Onhover}
              value={rateValue}
              character={({ index }) => customIcons[index]}
              style={{ fontSize: 36 }}
            />
          </Row>
          <Row
            justify="center"
            align="middle"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              top: "-50px",
            }}
          >
            <Input.TextArea
              onChange={onChangeText}
              style={{ width: "90%" }}
              placeholder="Write feedback here"
              autoSize={{ minRows: 3, maxRows: 3 }}
            />
          </Row>
          <Row
            justify="space-between"
            align="middle"
            style={{
              width: "100%",
              padding: "5px 40px",
              position: "relative",
              top: "-40px",
            }}
          >
            <Button type="text" style={{ color: "#5B0EEB" }}>
              Not now
            </Button>
            <Button
              type="primary"
              onClick={onClickSend}
              style={{
                padding: "0px 30px",
                borderRadius: "5px",
              }}
            >
              Submit
            </Button>
          </Row>
        </Col>
      )}
    </Row>
  );
}
export default RateUs;
