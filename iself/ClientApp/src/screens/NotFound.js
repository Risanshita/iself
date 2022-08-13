import { Result } from "antd";
import { Row, Col } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import notfound from "../assets/animatedIcons/notfound.json";
export default function NotFound() {
  return (
    <Row align="middle" justify="center">
      <Col justify="center" alig="middle">
        <Player
          autoplay
          loop
          src={notfound}
          style={{ height: "500px", width: "700px" }}
        ></Player>
      </Col>
    </Row>
  );
}
