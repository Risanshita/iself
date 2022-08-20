import { Cascader } from "antd";
import PostList from "../post/postList";
import { Row, Button, Popover } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { PostContext } from "../../context/postContext";
import { useContext, useState } from "react";
import ProfileHeader from "./profilehead";
import "./style.css";
import { PostTypes } from "../post/post";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import start from "../../assets/animatedIcons/start.json";

function Profile() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const { loadData } = actions.post;
  const [filterData, setFilter] = useState({ type: "" });
  const { postDetails } = state.post;
  const userId = localStorage.getItem("user_id");
  if (isInitialLoad) {
    loadData({ createdBy: userId });
    setInitialLoad(false);
  }

  const onChange = (values) => {
    if (Array.isArray(values) && values.length > 0) {
      var filter = { ...filterData, type: values[0] };
      loadData(filter);
      setFilter(filter);
    } else {
      filter = { ...filterData, type: "" };
      setFilter(filter);
      loadData(userId);
    }
  };

  const onLoadMore = () => {
    loadData(filterData, true);
  };

  const options = [
    {
      label: "All",
      value: "",
    },
    {
      label: "CodeTip",
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
      <Cascader
        style={{
          width: "100%",
        }}
        options={options}
        onChange={onChange}
        multiple={false}
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        defaultValue={[[""]]}
        value={[[filterData.type]]}
      />
    </Row>
  );

  const filterbox = (
    <div className="filtterBoox">
      <Popover content={content} title="Post type" placement="left">
        <Button type="primary" icon={<FilterOutlined />}></Button>
      </Popover>
    </div>
  );

  return (
    <Row
      justify="end"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
    >
      <ProfileHeader />
      {filterbox}
      <PostList
        postDetails={postDetails}
        isProfile={true}
        onChange={onChange}
        onLoadMore={onLoadMore}
      />
      <Row justify="center" align="middle">
        <NavLink tag={Link} to="/feedback" className="floating-feedback-button">
          <Player
            // hover={true}
            autoplay
            loop
            src={start}
            style={{ height: "40px", width: "40px" }}
          />
        </NavLink>
      </Row>
    </Row>
  );
}
export default Profile;
