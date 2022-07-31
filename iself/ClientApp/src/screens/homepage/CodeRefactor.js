import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Textfit from "../../utils/Textfit";

const CodeRefactor = ({ post }) => {
  const [firstFontSize, setFirstFontSize] = useState(0);
  const [isFirstReady, setFirstReady] = useState(false);

  useEffect(() => {
    setFirstReady(false);
    setFirstFontSize(0);
  }, [post]);

  const getHtml = (data) => {
    var temp = data.replaceAll("\n", " <br /> 1   line");
    var count = temp.split("<br />").length;
    if (count < 10) temp += " <br /> <br /> <br /> <br /> <br />";
    return temp;
  };
  
  return (
    <Row
      style={{ height: "100%", width: "100%" }}
      justify="center"
      align="middle"
      className="info-byte-page"
    >
      <Col
        span={12}
        style={{
          height: "100%",
          fontSize: firstFontSize,
          textAlign: "left",
          textDecoration: "line-through dashed 1px",
        }}
      >
        {isFirstReady && firstFontSize && (
          <SyntaxHighlighter
            language={post.language}
            showLineNumbers="true"
            wrapLongLines="true"
            wrapLines="true"
            style={{
              ...a11yDark,
              hljs: { ...a11yDark.hljs, background: "transparent" },
            }}
          >
            {post.data1}
          </SyntaxHighlighter>
        )}
        {!isFirstReady && (
          <Textfit
            mode="multi"
            autoResize={true}
            max={800}
            forceSingleModeWidth={false}
            onReady={() => {
              setFirstReady(true);
            }}
            style={{ height: "100%", width: "100%" }}
            callback={(fontSize) => {
              setFirstFontSize(fontSize);
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: getHtml(post.data1),
              }}
            />
          </Textfit>
        )}
      </Col>
      <Col
        span={12}
        style={{
          height: "100%",
          fontSize: firstFontSize,
          textAlign: "left",
        }}
      >
        <SyntaxHighlighter
          language={post.language}
          showLineNumbers="true"
          wrapLongLines="true"
          style={{
            ...a11yDark,
            hljs: { ...a11yDark.hljs, background: "transparent" },
          }}
        >
          {post.data2}
        </SyntaxHighlighter>
      </Col>
    </Row>
  );
};
export default CodeRefactor;
