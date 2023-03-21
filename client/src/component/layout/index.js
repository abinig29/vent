import { Outlet } from "react-router-dom";
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import SideDrawer from "../drawer/drawer.js";

const Layout = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", backgroundColor: "#f1f1f1" }}
    >
      <CssBaseline />
      <SideDrawer />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
