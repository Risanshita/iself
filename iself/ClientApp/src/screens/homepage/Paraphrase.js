import { Row, Col } from "antd";
import AnimatedText from "react-animated-text-content";
const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Paraphrase = ({ post }) => {
  return (
    <Row
      style={{ height: "100%" }}
      justify="center"
      align="middle"
      className="info-byte-page"
    >
      <Col>
        <Row
          className="praphrase-text"
          justify="center"
          style={{ marginBottom: 50 }}
        >
          {post.data1}
        </Row>
        <AnimatedText
          type="words" // animate words or chars
          animation={{
            x: "200px",
            y: "-20px",
            scale: 1.1,
            ease: "ease-in-out",
          }}
          animationType="float"
          interval={0.06}
          duration={0.8}
          tag="p"
          className="animated-paragraph"
          includeWhiteSpaces
          threshold={0.1}
          rootMargin="20%"
        >
          {post.data1 + post.data1}
        </AnimatedText>
      </Col>

      {/* <Button
        onClick={() => {
          document.getElementById("app_body").requestFullscreen();
        }}
      >
        Full Screen
      </Button> */}
    </Row>
  );
};
export default Paraphrase;
