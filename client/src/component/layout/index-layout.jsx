import { Outlet } from "react-router-dom";
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import SideDrawer from "../drawer";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <CssBaseline />
      <SideDrawer flex={1} />
      <Box flex={1}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
