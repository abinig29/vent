import styled from "@emotion/styled";

import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Nav from "../../component/nav/nav";
import Posts from "../../component/posts/posts";
import RightBar from "../../component/rightBar/rightBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllVents } from "../../feature/ventSlice";

const Home = ({ type }) => {
  const { posts, isLoading } = useSelector((state) => state.vent);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const visibleHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollHeight = scrollY + visibleHeight;

    if (scrollHeight + 5 >= totalHeight * 0.7) {
      setPage((pre) => pre + 1);
    }
  };
  useEffect(() => {
    dispatch(getAllVents(page));
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
  });

  return (
    <StyledBox>
      <Box flex={"1.2"}>
        <Nav />
        <Posts posts={posts} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isLoading && <CircularProgress size={100} />}
        </Box>
      </Box>

      {/* <Posts saved={true} posts={posts} isLoading={isLoading} /> */}

      <Box flex={"1"}>
        <RightBar />
      </Box>
    </StyledBox>
  );
};

export default Home;
