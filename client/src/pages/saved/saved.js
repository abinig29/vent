import React from "react";
import { Box } from "@mui/material";
import Posts from "../../component/posts/posts";
import { vent } from "../../data";

const Saved = () => {
  return (
    <Box bgcolor="#ebeaeb">
      <Posts saved={true} />
    </Box>
  );
};

export default Saved;
