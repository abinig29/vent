import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

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
    justifyContent: "space-evenly",
  });
  return (
    <StyledBox>
      <Box sx={{ paddingX: "10rem", background: "red" }}>
        {text}
        sdbvldhsvnkljnklnjbmjknjk kkmmdfsv jhdf
      </Box>
      <Box>
        <Typography variant="h1" color="initial">
          Happy
        </Typography>
      </Box>
    </StyledBox>
  );
};

export default Home;
