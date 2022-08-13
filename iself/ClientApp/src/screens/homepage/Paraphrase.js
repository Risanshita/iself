import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import AnimatedText from "react-animated-text-content";
import Textfit from "../../utils/Textfit";
import "./Style.css";
const Paraphrase = ({ post }) => {
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
        className="praphrase-text"
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
      <Row
        style={{
          height: "50%",
          width: "100%",
          overflowX: "hidden",
          fontSize: fontSize,
        }}
        justify="center"
        align="middle"
      >
        {isReady && fontSize && (
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
            tag="div"
            className="animated-paragraph"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
          >
            {post.data2}
          </AnimatedText>
        )}
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
            {post.data2}
          </Textfit>
        )}
      </Row>
      <span className="post-info by">{post.ownerName}</span>
      <span className="post-info source">
        <div className="author">{" " + post.source}</div>
        <div className="author">{post.author}</div>
      </span>
    </Row>
  );
};
export default Paraphrase;
