import { DatePicker } from "antd";
import { Route, Routes } from "react-router-dom";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import MovieManager from "./pages/MovieManager/MovieManager";
import UserManager from "./pages/User Manager/UserManager";
import AddMovie from "./pages/Add Movie/AddMovie";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import BookingTicket from "./pages/Booking Ticket/BookingTicket";
import SignUp from "./pages/Sign Up/SignUp";
import EditMovie from "./pages/Edit Movie/EditMovie";
import UserPage from "./pages/User Page/UserPage";
import AddUser from "./pages/Add User/AddUser";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserTemplate />} path="/">
          <Route element={<HomePage />} index></Route>
          <Route element={<MovieDetail />} path="detail_movie/:movieId"></Route>
          <Route element={<SignUp />} path="sign_up"></Route>
          <Route
            element={<BookingTicket />}
            path="booking_ticket/:showTimeId"
          ></Route>
          <Route element={<UserPage />} path="/profile"></Route>
        </Route>
        <Route element={<AdminTemplate />} path="/admin">
          <Route element={<MovieManager />} index></Route>
          <Route element={<UserManager />} path="manager_user"></Route>
          <Route element={<AddMovie />} path="add_movie"></Route>
          <Route element={<EditMovie />} path="edit_movie/:movieId"></Route>
          <Route element={<AddUser />} path="add_user"></Route>
        </Route>
        <Route element={<Login />} path="/login"></Route>
      </Routes>
    </>
  );
}

export default App;
