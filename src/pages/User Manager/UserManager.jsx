import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Flex, Space, Table, Tag } from "antd";
import { userServ } from "../../services/userServ";
import { Button, Modal } from "antd";
import "./UserManger.css";
import Manager_AddUser from "./Manager_AddUser";
import Manager_UpdateUser from "./Manager_UpdateUser";

const UserManager = () => {
  const [userList, setUserList] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  useEffect(() => {
    userServ
      .fetchUserDataList()
      .then((result) => {
        console.log("result", result.data.content);
        setUserList(result.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const columns = [
    {
      title: "Account",
      dataIndex: "taiKhoan",

      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "200px",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "User Type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },

    {
      title: "Action",
      key: "action",
      width: "100px",
      render: (_, record) => (
        <div className="space-x-2">
          <i
            className="fa-solid fa-trash text-red-500 text-lg cursor-pointer hover:text-xl duration-200"
            onClick={() => {
              console.log("record", record.taiKhoan);
              userServ
                .removeUser(record.taiKhoan)
                .then((result) => {
                  console.log("result", result);
                  userServ
                    .fetchUserDataList()
                    .then((result) => {
                      console.log("result", result.data.content);
                      setUserList(result.data.content);
                    })
                    .catch((err) => {
                      console.log("err", err);
                    });
                })
                .catch((err) => {
                  console.log("err", err);
                });
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square text-lime-700 text-lg cursor-pointer hover:text-xl duration-200"
            onClick={() => {
              showModalUpdate();
              userServ
                .fetchUserData_Admin(record.taiKhoan)
                .then((result) => {
                  console.log("result", result);
                  setUserDataUpdate(result.data.content);
                })
                .catch((err) => {
                  console.log("err", err);
                });
            }}
          ></i>
        </div>
      ),
    },
  ];

  //modal

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [userDataUpdate, setUserDataUpdate] = useState("");

  const showModalAdd = () => {
    setOpenAdd(true);
  };
  const showModalUpdate = () => {
    console.log("test");

    setOpenUpdate(true);
  };
  // const handleOk = () => {
  //   setOpen(false);
  // };

  const handleCancel = () => {
    setOpenAdd(false);
    setOpenUpdate(false);
  };

  return (
    <>
      <div className="container mx-auto">
        <form
          className="w-full mt-5 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("searchInputValue", searchInputValue);
            userServ
              .findUser(searchInputValue)
              .then((result) => {
                console.log("result", result.data.content);
                setUserList(result.data.content);
              })
              .catch((err) => {
                console.log("err", err);
              });
          }}
        >
          <div className="w-full mx-auto mb-5 grid grid-cols-2">
            <Space>
              <Button
                type="primary"
                onClick={showModalAdd}
                style={{
                  backgroundColor: "#49AF75",
                  color: "white",
                  padding: "20px 25px",
                  fontSize: "20px",
                  // width: "100%",
                }}
              >
                Add user
              </Button>
            </Space>
            <Modal
              open={openAdd}
              // onOk={handleOk}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  {/* <OkBtn /> */}
                </>
              )}
            >
              <Manager_AddUser
                setOpenAdd={setOpenAdd}
                setUserList={setUserList}
              />
            </Modal>
            <Modal
              open={openUpdate}
              // onOk={handleOk}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  {/* <OkBtn /> */}
                </>
              )}
            >
              <Manager_UpdateUser
                userDataUpdate={userDataUpdate}
                setOpenUpdate={setOpenUpdate}
                setUserList={setUserList}
              />
            </Modal>
            <label
              htmlFor="search"
              className="block mb-2.5 text-sm font-medium text-heading sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                placeholder="Search"
                onChange={(e) => {
                  setSearchInputValue(e.target.value);
                }}
              />
              <button
                type="submit"
                className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={userList}
            pagination={{ pageSize: 5 }}
            tableLayout="fixed"
            rowKey="taiKhoan"
          />
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default"></div>
        </form>
      </div>
    </>
  );
};

export default UserManager;
