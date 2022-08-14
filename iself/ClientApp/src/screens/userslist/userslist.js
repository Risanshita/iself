import { Col, Row, Space, Table, Tag } from "antd";
import React, { useContext, useState } from "react";
import { AccountContext } from "../../context/accountContext";
import ListHeader from "./../../components/ListHeader";
import "./Style.css";

const UsersList = () => {
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [users, setUsers] = useState([]);

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
  const columns = [
    {
      profile: "",
      title: "Full Name",
      dataIndex: "fullName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "tags",
      dataIndex: "role",
      render: (_, { role }) => {
        let color = role.length > 5 ? "user" : "green";
        if (role === "super admin") {
          color = "volcano";
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
          <a>Reset Password</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "SuperAdmin",
    },
    {
      key: "2",
      name: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      name: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "Admin",
    },
    {
      key: "1",
      name: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "User",
    },
    {
      key: "2",
      name: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      name: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "1",
      name: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "User",
    },
    {
      key: "2",
      name: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      name: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "1",
      name: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "User",
    },
    {
      key: "2",
      name: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      name: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
  ];

  return (
    <Row className="usermanage-page">
      <ListHeader pagination={{}} onSubmitSearch={onSearch} />
      <Col span={24} style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: window.innerHeight - 180 }}
        />
      </Col>
    </Row>
  );
};
export default UsersList;
