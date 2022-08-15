import { Row, Popover, Button } from "antd";
import { PostContext } from "../../context/postContext";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { FilterOutlined } from "@ant-design/icons";
import PostList from "../post/postList";
import { Cascader } from "antd";
import { PostTypes } from "../post/post";
function BrowseList() {
  const { state, actions } = useContext(PostContext);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [filterData, setFilter] = useState({});
  const { loadData } = actions.post;
  const { postDetails } = state.post;

  const userId = localStorage.getItem("user_id");

  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }

  const onChange = (values) => {
    if (Array.isArray(values) && values.length > 0) {
      var filter = { ...filterData, type: values[0] };
      loadData(filter);
      setFilter(filter);
    } else {
      var filter = { ...filterData, type: "" };
      setFilter(filter);
      loadData(userId);
    }
  };

  const onLoadMore = () => {
    loadData(filterData, true);
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
      justify="center"
      style={{ height: "100%", overflowY: "auto", padding: "20px" }}
      align="top"
    >
      <div className="filter"> {filterbox}</div>
      <PostList postDetails={postDetails} onLoadMore={onLoadMore} />
    </Row>
  );
}
export default BrowseList;
