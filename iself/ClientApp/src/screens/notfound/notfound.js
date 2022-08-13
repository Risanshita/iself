import { Row, Col } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import notfound from "../../assets/animatedIcons/notfound.json";
function Notfound() {
  return (
    <Row align="middle" justify="center">
      <Col justify="center" alig="middle">
        <Player
          autoplay
          loop
          src={notfound}
          style={{ height: "400px", width: "400px" }}
        ></Player>
        <p>Post Not Found</p>
      </Col>
    </Row>
  );
}
export default Notfound;
