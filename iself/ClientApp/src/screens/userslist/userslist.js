import { Space, Table, Tag } from "antd";
import React from "react";
const columns = [
  {
    profile: "",
    title: "Full Name",
    dataIndex: "name",
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
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "user" : "green";

          if (tag === "super admin") {
            color = "volcano";
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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
    tags: ["super admin", "admin"],
  },
  {
    key: "2",
    name: "Nitish kumar",
    email: "Nitishr833@gmail.com",
    tags: ["admin"],
  },
  {
    key: "3",
    name: "Vikash kumar",
    email: "Nitishr833@gmail.com",
    tags: ["user"],
  },
  {
    key: "1",
    name: "Rishi Kumar",
    email: "Rishikumar@gmail.com",
    tags: ["super admin", "admin"],
  },
  {
    key: "2",
    name: "Nitish kumar",
    email: "Nitishr833@gmail.com",
    tags: ["admin"],
  },
  {
    key: "3",
    name: "Vikash kumar",
    email: "Nitishr833@gmail.com",
    tags: ["user"],
  },
  {
    key: "1",
    name: "Rishi Kumar",
    email: "Rishikumar@gmail.com",
    tags: ["super admin", "admin"],
  },
  {
    key: "2",
    name: "Nitish kumar",
    email: "Nitishr833@gmail.com",
    tags: ["admin"],
  },
  {
    key: "3",
    name: "Vikash kumar",
    email: "Nitishr833@gmail.com",
    tags: ["user"],
  },
  {
    key: "1",
    name: "Rishi Kumar",
    email: "Rishikumar@gmail.com",
    tags: ["super admin", "admin"],
  },
  {
    key: "2",
    name: "Nitish kumar",
    email: "Nitishr833@gmail.com",
    tags: ["admin"],
  },
  {
    key: "3",
    name: "Vikash kumar",
    email: "Nitishr833@gmail.com",
    tags: ["user"],
  },
];

const UsersList = () => <Table columns={columns} dataSource={data} />;

export default UsersList;
