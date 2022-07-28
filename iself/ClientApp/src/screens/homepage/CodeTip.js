import { Button, Col, Row } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";

const CodeTip = ({ post }) => {
  var code = `using System;

    namespace HelloWorld
    {
      class Program
      {
        static void Main(string[] args)
        {
          Console.WriteLine("Hello World!");    
        }
      }
    }`;
  return (
    <Row
      style={{ height: "100%" }}
      justify="center"
      align="middle"
      className="info-byte-page"
    >
      <Col span={24} style={{ fontSize: "20pxs", textAlign: "left"  }}>
        <SyntaxHighlighter language="csharp" showLineNumbers="true" >
          {code}
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
