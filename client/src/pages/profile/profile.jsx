import React from "react";
import { Box, Stack } from "@mui/material"
import ProfileHeader from "../../component/profileHeader/profileHeader";
import { Outlet } from "react-router-dom";
const Profile = () => {
  return <Box width={"100%"} bgcolor={"#ebeaeb"} >
    <ProfileHeader />
    <Box sx={{ display: "flex" }}>
      <Outlet />
      <Box flex={1}>
      </Box>
    </Box>
  </Box >
};

export default Profile;
