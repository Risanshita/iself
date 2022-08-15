import { Col, Modal, Row, Space, Table, Tag } from "antd";
import React, { useContext, useState } from "react";
import { AccountContext } from "../../context/accountContext";
import ListHeader from "./../../components/ListHeader";
import { Dropdown, Menu } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./Style.css";
import { UserRoles } from "../../context/accountContext/state/Reducers";

const { confirm } = Modal;

const UsersList = () => {
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [userDetails, setUsers] = useState([]);
  // const [color, setColor] = useState("green");
  const { actions } = useContext(AccountContext);
  const { userList } = actions.account;

  if (isInitialLoad) {
    userList("", (a) => {
      setUsers(a);
    });
    setInitialLoad(false);
  }
  const onSearch = (val) => {
    userList(val ? val : "", (a) => {
      setUsers(a);
    });
  };

  const sortString = (a, b, column) => {
    a[column] = a[column] ? a[column] : "";
    b[column] = b[column] ? b[column] : "";

    var res = a[column].localeCompare(b.column);
    return res;
  };

  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key === "Delete") showDeleteConfirm();
      }}
      items={[
        {
          label: "Reset",
          key: "Reset",
        },
        {
          label: "Delete",
          key: "Delete",
        },
        {
          label: "Activate",
          key: "Activate",
        },
        {
          label: "Deactivate",
          key: "Deactivate",
        },
      ]}
    />
  );

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      // render: (text) => <a>{text}</a>,
      sorter: (a, b) => sortString(a, b, "fullName"),
      sortDirections: ["descend", "ascend"],
      showSorterTooltip: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      key: "tags",
      dataIndex: "role",
      render: (_, { role }) => {
        let color = "green";
        if (role === UserRoles.SuperAdmin) {
          color = "red";
        } else if (role === UserRoles.Admin) {
          color = "blue";
        }
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown.Button
            icon={<DownOutlined />}
            overlay={menu}
            trigger={["click"]}
            onClick={(e) => e.preventDefault()}
          >
            Edit
          </Dropdown.Button>
        </Space>
      ),
    },
  ];
 
  const showDeleteConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",

      onOk() {
        console.log("OK");
      },

      onCancel() {},
    });
  };
  return (
    <Row className="usermanage-page">
      <ListHeader pagination={{}} onSubmitSearch={onSearch} />
      <Col span={24} style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={userDetails.data}
          pagination={false}
          scroll={{ y: window.innerHeight - 180 }}
        />
      </Col>
    </Row>
  );
};
export default UsersList;
