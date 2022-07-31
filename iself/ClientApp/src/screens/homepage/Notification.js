import { NotificationOutlined } from "@ant-design/icons";
import { Row } from "antd";
import Textfit from "../../utils/Textfit";
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
      align="middle"
      className="info-byte-page"
    >
      <Row justify="center" align="top">
        <NotificationOutlined
          style={{ paddingRight: "10px", fontSize: "24px" }}
        />
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
      <span className="post-info by">{post.createdBy}</span>
      <span className="post-info source">
        <div className="author">{post.source}</div>
        <div className="author">{post.author}</div>
      </span>
    </Row>
  );
};

export default Notification;
