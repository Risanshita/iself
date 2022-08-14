import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Col, Row } from "antd";
import { Link, NavLink } from "react-router-dom";
import ExpendableSearchBox from "../searchBox";
import settinglogo from "../../assets/animatedIcons/setting.json";
export default function ListHeader({ pagination, onSubmitSearch }) {
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ height: 35, marginBottom: 5, width: "100%" }}
    >
      {pagination && (
        <Col span={6}>
          {pagination.totalItems > 0 && (
            <span>
              1 - {pagination.endRecord} of {pagination.totalItems}
            </span>
          )}
        </Col>
      )}
      <Col span={18}>
        <Row align="middle" justify="end">
          <ExpendableSearchBox
            onSubmit={onSubmitSearch}
            style={{ borderColor: "#fc6820" }}
          />
          <NavLink tag={Link} to="/signup">
            <Button
              style={{
                border: "1px solid #4361EE",
              }}
              type="text"
              icon={
                <Player
                  hover={true}
                  loop
                  src={settinglogo}
                  style={{ height: "32px", width: "35px" }}
                />
              }
            />
          </NavLink>
        </Row>
      </Col>
    </Row>
  );
}
