import React, { useEffect, useState } from "react";
import { filmServManagement } from "../../services/filmServManagement";
import { Flex, message, Popconfirm, Space, Table, Tag } from "antd";
import { getLocalStorage } from "../../utils/local";
import useMessage from "antd/es/message/useMessage";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieThunk } from "../../redux/Slice/movieSlice";
import { useNavigate } from "react-router-dom";

const MovieManager = () => {
  const dispatch = useDispatch();
  const { listMovie } = useSelector((state) => state.movieSlice);
  const navigate = useNavigate();
  // const [listMovie, setListMovie] = useState([]);

  const [messageApi, holder] = message.useMessage();
  const confirm = (e, record) => {
    const dataUser = getLocalStorage("userInfo");
    console.log(`Bearer ${dataUser.accessToken}`);
    filmServManagement
      .deleteMovie(record.maPhim)
      .then((result) => {
        filmServManagement
          .getAllMovie()
          .then((result) => {
            // setListMovie(result.data.content);
            dispatch(getAllMovieThunk());
            messageApi.success("Delete Film successfully");
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const cancel = (e) => {
    messageApi.error("Delete command aborted!");
  };

  useEffect(() => {
    // filmServManagement
    //   .getAllMovie()
    //   .then((result) => {
    //     console.log("result", result.data.content);
    //     setListMovie(result.data.content);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
    dispatch(
      getAllMovieThunk({
        hoTen: "Dong",
        gioiTinh: "nam",
      })
    );
  }, []);

  const columns = [
    {
      title: "Movie Code",
      dataIndex: "maPhim",
      key: "maPhim",
      // render: (value, record, index) => {
      //   console.log(value);
      //   // console.log(record);
      //   // console.log(index);
      // },
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
        console.log("record", record);

        return (
          <div className="space-x-3 space-y-3">
            {holder}
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
                className="text-white bg-red-600 py-2 px-4 rounded-md cursor-pointer"
                onClick={() => {
                  console.log(record.maPhim);
                }}
              >
                Delete
              </button>
            </Popconfirm>

            <button
              className="text-white bg-yellow-400 py-2 px-4 rounded-md cursor-pointer"
              onClick={() => {
                navigate(`/admin/edit_movie/${record.maPhim}`);
              }}
            >
              Modify
            </button>
          </div>
        );
      },
    },
  ];

  console.log(listMovie);

  return (
    <div>
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
