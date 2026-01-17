import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { userServ } from "../../services/userServ";
import { useDispatch } from "react-redux";
import UpdateUserInformation from "./UpdateUserInformation";
import TicketHistoryTab from "./TicketHistoryTab";
import { endedLoading, startedLoading } from "../../redux/Slice/loadingSlice";
import { getLocalStorage } from "../../utils/local";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const onChange = (key) => {
    if (key === 0) {
      setTitle("Your Personal Information");
    } else {
      setTitle("Your Booking Ticket History");
    }
  };
  const arrTab = ["User Information", "Ticket History"];
  const [title, setTitle] = useState("Your Personal Information");
  const [userData, setUserData] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startedLoading());
    const userInfo = getLocalStorage("userInfo");
    if (!userInfo?.taiKhoan) {
      navigate("/login");
      return;
    }
    const accountId = getLocalStorage("userInfo").taiKhoan;

    userServ
      .fetchUserData_User(accountId)
      .then((result) => {
        console.log("result", result);
        setUserData(result.data.content);
        dispatch(endedLoading());
      })
      .catch((err) => {
        dispatch(endedLoading());
      });
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen pt-10 bg-white">
      <h1 className="uppercase text-3xl text-center font-bold">{title}</h1>
      <div
        className="container mx-auto p-5 rounded-lg my-5"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Tabs
          onChange={onChange}
          type="card"
          items={arrTab.map((item, index) => {
            return {
              label: item,
              key: index,
              children: (
                <>
                  {index === 0 ? (
                    <UpdateUserInformation userData={userData} />
                  ) : (
                    // <div className="grid grid-cols-3">
                    //   <div className="grid grid-cols-2 gap-5">
                    //     <img
                    //       src="https://substackcdn.com/image/fetch/$s_!SjlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289ad232-bb03-4b07-848c-d0dad888a4dc_2000x2963.png"
                    //       alt=""
                    //       className="grid-cols-1"
                    //     />
                    //     <div className="content_left space-y-1 py-2">
                    //       <div className="content_up space-y-1">
                    //         <h2 className="text-base font-bold">
                    //           GLX - Nguyen Du
                    //         </h2>
                    //         <p className="text-gray-400">25 Huynh Thuc Khang</p>
                    //       </div>
                    //       <div className="content_down space-y-1 ">
                    //         <p className="font-bold">
                    //           Booking date:
                    //           <br />
                    //           <span className="text-red-500">
                    //             1-10-2025 19:50:00{" "}
                    //           </span>
                    //         </p>
                    //         <span className="text-green-500">
                    //           Screen 1 Seat 15
                    //         </span>
                    //       </div>
                    //     </div>
                    //   </div>
                    //   <div className="grid grid-cols-2 gap-5">
                    //     <img
                    //       src="https://substackcdn.com/image/fetch/$s_!SjlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289ad232-bb03-4b07-848c-d0dad888a4dc_2000x2963.png"
                    //       alt=""
                    //       className="grid-cols-1"
                    //     />
                    //     <div className="content_left space-y-1 py-2">
                    //       <div className="content_up space-y-1">
                    //         <h2 className="text-base font-bold">
                    //           GLX - Nguyen Du
                    //         </h2>
                    //         <p className="text-gray-400">25 Huynh Thuc Khang</p>
                    //       </div>
                    //       <div className="content_down space-y-1 ">
                    //         <p className="font-bold">
                    //           Booking date:
                    //           <br />
                    //           <span className="text-red-500">
                    //             1-10-2025 19:50:00{" "}
                    //           </span>
                    //         </p>
                    //         <span className="text-green-500">
                    //           Screen 1 Seat 15
                    //         </span>
                    //       </div>
                    //     </div>
                    //   </div>
                    //   <div className="grid grid-cols-2 gap-5">
                    //     <img
                    //       src="https://substackcdn.com/image/fetch/$s_!SjlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289ad232-bb03-4b07-848c-d0dad888a4dc_2000x2963.png"
                    //       alt=""
                    //       className="grid-cols-1"
                    //     />
                    //     <div className="content_left space-y-1 py-2">
                    //       <div className="content_up space-y-1">
                    //         <h2 className="text-base font-bold">
                    //           GLX - Nguyen Du
                    //         </h2>
                    //         <p className="text-gray-400">25 Huynh Thuc Khang</p>
                    //       </div>
                    //       <div className="content_down space-y-1 ">
                    //         <p className="font-bold">
                    //           Booking date:
                    //           <br />
                    //           <span className="text-red-500">
                    //             1-10-2025 19:50:00{" "}
                    //           </span>
                    //         </p>
                    //         <span className="text-green-500">
                    //           Screen 1 Seat 15
                    //         </span>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <TicketHistoryTab userData={userData} />
                  )}
                </>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default UserPage;
