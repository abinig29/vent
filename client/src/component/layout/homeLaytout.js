import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../nav/nav";

const HomeLaytout = () => {
  return (
    <Box sx={{ bgcolor: "#ebeaeb" }}>
      <Outlet />
    </Box>
  );
};

export default HomeLaytout;
