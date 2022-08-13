import { Cascader } from "antd";
import PostList from "../post/postList";
import { Row, Button, Popover } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { PostContext } from "../../context/postContext";
import { useContext, useState } from "react";
import ProfileHeader from "./profilehead";
import "./style.css";
import { PostTypes } from "../post/post";

function Profile() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const { loadData } = actions.post;
  const { posts } = state.post;
  const userId = localStorage.getItem("user_id");
  if (isInitialLoad) {
    loadData(userId);
    setInitialLoad(false);
  }

  const onChange = (values) => {
    // values = values[0];
    if (Array.isArray(values) && values.length > 0) {
      loadData(userId, "", values[0]);
    } else {
      loadData(userId);
    }
  };
  const options = [
    {
      label: "Code",
      value: PostTypes.codeTip,
    },
    {
      label: "Info Byte",
      value: PostTypes.infoByte,
    },
    {
      label: "Notification",
      value: PostTypes.notification,
    },
    {
      label: "Paraphrase",
      value: PostTypes.paraphrase,
    },
    {
      label: "Code-Refactor",
      value: PostTypes.refactor,
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

  const filterbox = (
    <div className="filtterBoox">
      <Popover content={content} title="Filter option" placement="left">
        <Button type="primary" icon={<FilterOutlined />}></Button>
      </Popover>
    </div>
  );

  return (
    <Row
      // className="postnew-page"
      justify="end"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
    >
      <ProfileHeader />
      {filterbox}
      <PostList posts={posts} isProfile={true} onChange={onChange} />
    </Row>
  );
}
export default Profile;
