import { Col, Row } from "antd";
import ExpendableSearchBox from "../SearchBox";
export default function ListHeader({ pagination, onSubmitSearch }) {
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ height: 35, marginBottom: 5 }}
    >
      <Col span={6}>
        {pagination.totalItems > 0 && (
          <span>
            1 - {pagination.endRecord} of {pagination.totalItems}
          </span>
        )}
      </Col>
      <Col span={18}>
        <Row align="middle" justify="end">
          <ExpendableSearchBox
            onSubmit={onSubmitSearch}
            style={{ borderColor: "#fc6820" }}
          />
        </Row>
      </Col>
    </Row>
  );
}
