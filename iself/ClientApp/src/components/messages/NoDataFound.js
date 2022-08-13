import { Row, Col } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import notfound from "../../assets/animatedIcons/notfound.json";
function NoDataFound() {
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Col>
        <Player
          autoplay
          loop
          src={notfound}
          style={{ height: "200px", width: "200px" }}
        ></Player>
        <Row justify="center">No post found.</Row>
      </Col>
    </Row>
  );
}
export default NoDataFound;
