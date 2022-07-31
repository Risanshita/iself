import { NotificationOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { useEffect, useState } from "react";
import AnimatedText from "react-animated-text-content";
import Textfit from "../../utils/Textfit";
import notification from "../../assets/images/notification.svg";
// const notificationsvg = () => {
//   <svg
//     width="50"
//     height="50"
//     viewBox="0 0 50 50"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M45.6252 39.0694L45.153 38.6528C43.8133 37.4592 42.6407 36.0903 41.6669 34.5833C40.6033 32.5035 39.9658 30.2323 39.7919 27.9028V21.0417C39.8011 17.3828 38.4739 13.8465 36.0596 11.0972C33.6453 8.34787 30.3102 6.5748 26.6808 6.1111V4.31944C26.6808 3.82768 26.4854 3.35607 26.1377 3.00834C25.79 2.66062 25.3184 2.46527 24.8266 2.46527C24.3349 2.46527 23.8632 2.66062 23.5155 3.00834C23.1678 3.35607 22.9724 3.82768 22.9724 4.31944V6.13888C19.3756 6.636 16.0807 8.41979 13.6982 11.1599C11.3156 13.8999 10.0068 17.4106 10.0141 21.0417V27.9028C9.84015 30.2323 9.20269 32.5035 8.13911 34.5833C7.182 36.0866 6.02827 37.4552 4.70855 38.6528L4.23633 39.0694V42.9861H45.6252V39.0694Z"
//       fill="white"
//     />
//     <path
//       d="M21.2773 44.4445C21.3991 45.3248 21.8354 46.1314 22.5055 46.7152C23.1757 47.299 24.0344 47.6206 24.9232 47.6206C25.8119 47.6206 26.6707 47.299 27.3408 46.7152C28.011 46.1314 28.4472 45.3248 28.569 44.4445H21.2773Z"
//       fill="white"
//     />
//   </svg>;
// };
// // svg icon
// const NotificationIcon = (props) => (
//   <Icon component={notificationsvg} {...props} />
// );

// sgv
const Notification = ({ post }) => {
  const [fontSize, setFontSize] = useState(0);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    setFontSize(0);
  }, [post]);

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
      <Row
        style={{
          height: "50%",
          width: "100%",
          overflowX: "hidden",
        }}
        justify="center"
        align="top"
      >
        <Row justify="center" align="top">
          <NotificationOutlined
            style={{ paddingRight: "10px", fontSize: "24px" }}
          />
          <h5>Notification</h5>
        </Row>

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
