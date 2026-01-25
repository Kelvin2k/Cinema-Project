import React, { useEffect } from "react";
import { filmServManagement } from "../../services/filmServManagement";
import { message, notification, Popconfirm, Table } from "antd";
import { getLocalStorage } from "../../utils/local";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieThunk } from "../../redux/Slice/movieSlice";
import { useNavigate } from "react-router-dom";

const MovieManager = () => {
  const dispatch = useDispatch();
  const { listMovie } = useSelector((state) => state.movieSlice);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title = "", description = "") => {
    api[type]({
      title: title,
      description: description,
    });
  };

  const confirm = async (e, record) => {
    try {
      const dataUser = getLocalStorage("userInfo") || {};
      if (!dataUser.accessToken) {
        openNotificationWithIcon(
          "error",
          "Unauthorized",
          "You need to log in to perform this action",
        );
        return;
      }

      await filmServManagement.deleteMovie(record.maPhim);
      // refresh list via thunk
      dispatch(getAllMovieThunk());
      openNotificationWithIcon(
        "success",
        "Delete Movie Successful",
        "Movie has been deleted successfully.",
      );
    } catch (err) {
      const errMsg =
        err?.response?.data?.content ||
        "Failed to delete movie. Please try again.";
      openNotificationWithIcon("error", "Delete Movie Failed", errMsg);
    }
  };
  const cancel = (e) => {
    message.error("Delete command aborted!");
  };

  useEffect(() => {
    dispatch(
      getAllMovieThunk({
        hoTen: "Dong",
        gioiTinh: "nam",
      }),
    );
  }, [dispatch]);

  const columns = [
    {
      title: "Movie Code",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Movie Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (url) => {
        return <img src={url} alt="" className="w-30 " />;
      },
    },
    {
      title: "Movie Name",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Description",
      dataIndex: "moTa",
      key: "moTa",
      render: (value) => <p className="line-clamp-2 w-56">{value}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="space-x-3 space-y-3">
            {contextHolder}
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={(e) => {
                confirm(e, record);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button
                className="text-red-600 text-lg cursor-pointer hover:scale-150 duration-200"
                onClick={() => {}}
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </Popconfirm>

            <button
              className=" text-yellow-400 text-lg cursor-pointer hover:scale-150 duration-200"
              onClick={() => {
                navigate(`/admin/edit_movie/${record.maPhim}`);
              }}
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              className="text-green-500 text-lg cursor-pointer hover:scale-150 duration-200"
              onClick={() => {
                navigate(`/admin/add_show_time/${record.maPhim}`);
              }}
            >
              <i class="fa-regular fa-calendar"></i>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <h2 className="font-bold text-2xl mb-5">Film List</h2>
      <Table
        columns={columns}
        dataSource={listMovie}
        pagination={{
          pageSize: 5,
          // current: 3,
        }}
      />
    </div>
  );
};
export default MovieManager;
