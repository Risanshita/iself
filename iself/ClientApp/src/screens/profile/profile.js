import { Cascader, Form } from "antd";
import PostList from "../post/postList";
import { Col, Row, Button, Popover } from "antd";
import { Dropdown, Menu, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { PostContext } from "../../context/postContext";
import { useContext, useState } from "react";
import ProfileHeader from "./profilehead";
import { MultiSelect } from "../../components/select";
import "./style.css";
// Filtter
//filter end

function Profile() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const { loadData, deletePost } = actions.post;
  const { posts } = state.post;

  if (isInitialLoad) {
    loadData(); 
    setInitialLoad(false);
  }

  const onChange = (values) => {
    // values = values[0];
    if (Array.isArray(values) && values.length > 0) {
      loadData("", "", values[0]);
    } else {
      loadData();
    }
  };
  const options = [
    {
      label: "Notification",
      value: "Notification",
    },
    {
      label: "Bulb",
      value: "Bulb",
    },
  ];
  const { SHOW_CHILD } = Cascader;

  const content = (
    <Row style={{ width: 200 }}>
      {/* <Form layout="horizontal" style={{ width: "100%" }}>
        <MultiSelect
          dataSource={{
            data: options,
            labelField: "label",
            valueField: "value",
          }}
          placeholder="Post type"
          noMargin={true}
          onChange={onChange}
        />
      </Form> */}
      <Cascader
        style={{
          width: "100%",
        }}
        options={options}
        onChange={onChange}
        multiple={false}
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        defaultValue={[["All"]]}
      />
    </Row>
  );

  return (
    <Row
      // className="postnew-page"
      justify="end"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
    >
      <ProfileHeader />
      <span className="filtterBoox">
        <Popover content={content} title="Filter option" placement="left">
          <Button type="primary" icon={<FilterOutlined />}></Button>
        </Popover>
      </span>
      <PostList posts={posts} />
    </Row>
  );
}
export default Profile;
