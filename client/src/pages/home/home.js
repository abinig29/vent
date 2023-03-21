import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Nav from "../../component/nav/nav";
import Posts from "../../component/posts/posts";

const Home = ({ type }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (type === "all") {
      setText("all");
    } else {
      setText("listning");
    }
  }, [type]);
  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
  });
  return (
    <StyledBox>
      <Box
        sx={{
          flex: "1.5",

          // bgcolor: "#eceaea",
        }}
      >
        <Nav />
        <Posts />
      </Box>
      <Box
        sx={{
          flex: "1",
        }}
      >
        T
      </Box>
    </StyledBox>
  );
};

export default Home;
