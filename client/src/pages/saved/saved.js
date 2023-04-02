import React from "react";
import { Box } from "@mui/material";
import Posts from "../../component/posts/posts";
import { vent } from "../../data";

const Saved = () => {
  return (
    <Box bgcolor="#ebeaeb" sx={{ display: "flex" }}>
      <Posts savedIcon={true} />
      <Box flex={1}></Box>
    </Box>
  );
};

export default Saved;
