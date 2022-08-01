import { Cascader } from "antd";
import PostList from "../post/postList";
import { Col, Row, Button, Popover } from "antd";
import { Dropdown, Menu, Space } from "antd";
import { PostContext } from "../../context/postContext";
import { useContext, useState } from "react";
import ProfileHeader from "./profilehead";
import "./style.css";
// Filtter
const onChange = (value) => {
  console.log(value);
};
const content = (
  <p>hsdfsd</p>
  // <div>
  //   <Cascader
  //     style={{
  //       width: "100%",
  //     }}
  //     options={options}
  //     onChange={onChange}
  //     multiple
  //     maxTagCount="responsive"
  //     showCheckedStrategy={SHOW_CHILD}
  //     defaultValue={[["All"]]}
  //   />
  // </div>
);
const { SHOW_CHILD } = Cascader;
const options = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Bulb",
    value: "Bulb",
  },
];
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

  return (
    <Row
      // className="postnew-page"
      justify="center"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
    >
      <ProfileHeader />
      <span className="filtterBoox" style={{ width: "200px" }}>
        <Popover content={content} title="Title">
          <Button type="primary">Hover me</Button>
        </Popover>
      </span>
      <PostList posts={posts} />
    </Row>
  );
}
export default Profile;
