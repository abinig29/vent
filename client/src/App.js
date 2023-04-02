import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import Message from "./pages/message/message.jsx";
import Notification from "./pages/notification/notification.js";
import Saved from "./pages/saved/saved.js";
import Layout from "./component/layout/index.js";
import HomeLayout from "./component/layout/homeLaytout.js";
import Posts from "./component/posts/posts.js";
import LoginPage from "./component/login/index.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const preUser = localStorage.getItem("user");
    if (preUser) {
      const { user, token } = JSON.parse(preUser);
      dispatch(setUser({ token, user }));
    }
  }, []);

  return (
    <div className="root">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<HomeLayout />}>
              <Route index element={<Home type="all" />} />
              <Route element={<Home type="listning" />} path="listning" />
            </Route>
            <Route path="vent/:id" element={<VentDetail />} />
            <Route path="message" element={<Message />} />
            <Route path="notification" element={<Notification />} />
            <Route path="saved" element={<Saved />} />
            <Route path="profile/:id" element={<Profile />}>
              <Route
                index
                element={<Posts listenIcon={false} savedIcon={true} />}
              />
              <Route
                path="reacted"
                element={<Profile type={"reactedVent"} />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
