import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Nav from "../../component/nav/nav";
import Posts from "../../component/posts/posts";
import RightBar from "../../component/rightBar/rightBar";
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
      <Box flex={"1.5"}>
        <Nav />
        <Posts saved={true} />
      </Box>
      <Box flex={"1"}>
        <RightBar />
      </Box>
    </StyledBox>
  );
};

export default Home;
