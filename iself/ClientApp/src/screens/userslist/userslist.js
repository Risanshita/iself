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
  const [searchKeyword, setSearchKeyword] = useState("");
  const { actions } = useContext(AccountContext);
  const { userList, deleteUser } = actions.account;

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
    setSearchKeyword(val ? val : "");
  };

  const sortString = (a, b, column) => {
    a[column] = a[column] ? a[column] : "";
    b[column] = b[column] ? b[column] : "";

    var res = a[column].localeCompare(b.column);
    return res;
  };

  const menu = (record) => (
    <Menu
      onClick={(e) => {
        if (e.key === "Delete") showDeleteConfirm(record);
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
            overlay={menu(record)}
            trigger={["click"]}
            onClick={(e) => e.preventDefault()}
          >
            Edit
          </Dropdown.Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Once deleted the user cannot be recovered.",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteUser(record.id, () => {
          userList(searchKeyword, (a) => {
            setUsers(a);
          });
        });
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
