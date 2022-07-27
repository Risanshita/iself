import { Row } from "antd";
import { useState, Select, Option } from "react";

function Demo() {
  const [Selects, setSelect] = useState();
  return (
    <Row
      className="postnew-page"
      justify="center"
      align="middle"
      style={{ height: "100%" }}
      >
      <Select value={Selects} onChange={(e) => setSelect(e.target.value)}>
        <Option>Home</Option>
        <Option>ABout</Option>
        <Option>Contact</Option>
      </Select>
    </Row>
  );
}
export default Demo;
