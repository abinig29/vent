import { configureStore } from "@reduxjs/toolkit";

import ventReducer from "./feature/ventSlice";
import userReducer from "./feature/userSlice.js";
import modalReducer from "./feature/modalSlice.js";
import notificationReducer from "./feature/notification.js";

export default configureStore({
  reducer: {
    vent: ventReducer,
    user: userReducer,
    modal: modalReducer,
    notification: notificationReducer,
  },
});
