import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Textfit from "../../utils/Textfit";

const CodeTip = ({ post }) => {
  const [fontSize, setFontSize] = useState(0);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    setFontSize(0);
  }, [post]);

  return (
    <Row
      style={{ height: "100%", width: "100%" }}
      justify="space-between"
      align="middle"
      className="info-byte-page"
    >
      {!isReady && (
        <Textfit
          mode="multi"
          autoResize={true}
          max={800}
          forceSingleModeWidth={false}
          onReady={() => {
            setReady(true);
          }}
          style={{ height: "100%", width: "100%" }}
          callback={(fontSize) => {
            setFontSize(fontSize);
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: post.data1.replaceAll("\n", "<br />1   line"),
            }}
          />
        </Textfit>
      )}
      {isReady && fontSize && (
        <Col span={24} style={{ fontSize: fontSize, textAlign: "left" }}>
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
      )}

      <span className="post-info by">{post.createdBy}</span>
      <span className="post-info source">
        <div className="author">{post.source}</div>
        <div className="author">{post.author}</div>
      </span>
      <span className="post-info by">{post.title}</span>
    </Row>
  );
};
export default CodeTip;
