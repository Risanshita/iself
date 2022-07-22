import { notification } from "antd";

const postNotification = (detail) => {
  console.log(detail);
  var { type, title, message } = detail;
  notification[type]({
    message: title,
    description: message,
    placement: "bottomRight",
    bottom: -10,
    style: { right: -15 },
  });
};

export default postNotification;
