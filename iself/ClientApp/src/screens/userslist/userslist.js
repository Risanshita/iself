import { Col, Row, Space, Table, Tag } from "antd";
import React, { useContext, useState } from "react";
import { AccountContext } from "../../context/accountContext";
import ListHeader from "./../../components/ListHeader";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Style.css";

const UsersList = () => {
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [users, setUsers] = useState([]);
  // const [color, setColor] = useState("green");
  const { actions } = useContext(AccountContext);
  const { userList } = actions.account;

  const enterLoading = (index) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

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

  const menu = (
    <Menu
      items={[
        {
          label: "Reset",
          key: "1",
        },
        {
          label: "Delete",
          key: "2",
        },
        {
          label: "Activate",
          key: "3",
        },
        {
          label: "Deactivate",
          key: "4",
        },
      ]}
    />
  );

  const columns = [
    {
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
          <Dropdown.Button
            icon={<DownOutlined />}
            overlay={menu}
            trigger={["click"]}
            onClick={(e) => e.preventDefault()}
          >
            Action
          </Dropdown.Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      fullName: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "SuperAdmin",
    },
    {
      key: "2",
      fullName: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      fullName: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "Admin",
    },
    {
      key: "1",
      fullName: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "User",
    },
    {
      key: "2",
      fullName: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      fullName: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "1",
      fullName: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "User",
    },
    {
      key: "2",
      fullName: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      fullName: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "1",
      fullName: "Rishi Kumar",
      email: "Rishikumar@gmail.com",
      role: "User",
    },
    {
      key: "2",
      fullName: "Nitish kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
    {
      key: "3",
      fullName: "Vikash kumar",
      email: "Nitishr833@gmail.com",
      role: "User",
    },
  ];

  const [loadings, setLoadings] = useState([]);

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
