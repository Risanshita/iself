import { Col, Row, Button, Input } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/accountContext";

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
            justify="center"
            align="middle"
            style={{
              width: "100%",
              padding: "5px 0",
              position: "relative",
              top: "-35px",
            }}
          > 
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
