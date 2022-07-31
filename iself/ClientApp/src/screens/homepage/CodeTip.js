import { Col, Row } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeTip = ({ post }) => {
  console.log(a11yDark);
  return (
    <Row
      style={{ height: "100%", width: "100%" }}
      justify="center"
      align="middle"
      className="info-byte-page"
    >
      <Col span={24} style={{ fontSize: "20px", textAlign: "left" }}>
        <SyntaxHighlighter
          language={post.language}
          showLineNumbers="true"
          wrapLongLines="true"
          style={{
            ...a11yDark,
            hljs: { ...a11yDark.hljs, background: "transparent" },
          }}
        >
          {post.data1}
        </SyntaxHighlighter>
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
export default CodeTip;
