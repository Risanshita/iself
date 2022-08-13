import { Row, Col } from "antd";
import "./demo.css";
import filterlogo from "../../assets/images/filter.png";
function DemoScreen() {
  return (
    <>
      <Row
        align="middle"
        justify="center"
        style={{ width: "100%", height: "100%", backgroundColor: "gray" }}
      >
        <Col style={{ width: "100%", height: "100%" }}>
          sdhfjsjh
          <div className="box">
            <div className="logodemo">
              <img src={filterlogo} width="25px" height="25px"></img>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default DemoScreen;
