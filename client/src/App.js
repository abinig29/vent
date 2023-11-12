import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./feature/user/userSlice.js";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import Layout from "./component/layout/index-layout.jsx";
import LoginPage from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Lisetning from "./pages/following.jsx";
import VentDetail from "./pages/vent-detail.jsx";
import Notification from "./pages/notification.jsx";
import Saved from "./pages/saved.jsx";
import Profile from "./pages/profile.jsx";
import { getNotification } from "./feature/notification/notification.js";
import OwnVent from "./pages/own-vent.jsx";
import ReactedVent from "./pages/reacted-vent.jsx";

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
            <Route path="home" element={<Home />} />
            <Route path="listning" element={<Lisetning />} />
            <Route path="vent/:id" element={<VentDetail />} />
            <Route path="notification" element={<Notification />} />
            <Route path="saved" element={<Saved />} />
            <Route path="profile/:id" element={<Profile />}>
              <Route index element={<OwnVent />} />
              <Route path="reacted" element={<ReactedVent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
