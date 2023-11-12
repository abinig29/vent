import { configureStore } from "@reduxjs/toolkit";

import ventReducer from "./feature/vent/ventSlice.js"
import userReducer from "./feature/user/userSlice.js"
import modalReducer from "./feature/modalSlice.js";
import notificationReducer from "./feature/notification/notification.js";

export default configureStore({
  reducer: {
    vent: ventReducer,
    user: userReducer,
    modal: modalReducer,
    notification: notificationReducer,
  },
});
