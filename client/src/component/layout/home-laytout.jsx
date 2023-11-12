import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";

const HomeLaytout = () => {
  return (
    <Box sx={{ bgcolor: "white" }}>
      <Outlet />
    </Box>
  );
};

export default HomeLaytout;
