import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./feature/userSlice.js";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/home.js";
import VentDetail from "./pages/ventDetail/ventDetail.js";
import Profile from "./pages/profile/profile.jsx";
import Notification from "./pages/notification/notification.js";
import Saved from "./pages/saved/saved.js";
import Layout from "./component/layout/index.js";
import HomeLayout from "./component/layout/homeLaytout.js";
import LoginPage from "./component/login/index.jsx";
import PostWrapper from "./pages/profile/PostWrapper.jsx";
import { getNotification } from "./feature/notification.js";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const preUser = localStorage.getItem("user");
    if (preUser) {
      const { user, token } = JSON.parse(preUser);
      dispatch(setUser({ token, user }));
    }
  }, []);
  useEffect(() => {
    dispatch(getNotification());
  }, [user]);

  return (
    <div className="root">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<HomeLayout />}>
              <Route index element={<Home type="all" />} />
              <Route element={<Home type="listning" />} path="listning" />
            </Route>
            <Route path="vent/:id" element={<VentDetail />} />
            <Route path="notification" element={<Notification />} />
            <Route path="saved" element={<Saved />} />
            <Route path="profile/:id" element={<Profile />}>
              <Route index element={<PostWrapper type={"userVent"} />} />
              <Route
                path="reacted"
                element={<PostWrapper type={"reactedVent"} />}
                // element={}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
