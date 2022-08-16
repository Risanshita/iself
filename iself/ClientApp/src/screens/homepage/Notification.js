import { Row } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import Textfit from "../../utils/Textfit";
import NotificationIcon from "../../assets/animatedIcons/Notification.json";
// sgv
const Notification = ({ post }) => {
  return (
    <Row
      style={{
        height: "100%",
        width: "100%",
        overflowX: "hidden",
      }}
      justify="center"
      align="top"
      className="info-byte-page"
    >
      <Row justify="center" align="top">
        <Player
          autoplay
          loop
          src={NotificationIcon}
          style={{ height: "30px", width: "30px" }}
        ></Player>
        <h5>Notification</h5>
      </Row>
      <Row
        style={{
          height: "50%",
          width: "100%",
          overflowX: "hidden",
        }}
        justify="center"
        align="top"
      >
        <Textfit
          mode="multi"
          autoResize={true}
          max={800}
          forceSingleModeWidth={false}
          style={{ height: "100%", width: "100%" }}
        >
          {post.data1}
        </Textfit>
      </Row>
          <span className="post-info by">{post.ownerName}</span>
      <span className="post-info source">
        <div className="author">{post.createdDate}</div>
        <div className="author">{post.author}</div>
      </span>
    </Row>
  );
};

export default Notification;
