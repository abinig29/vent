import styled from "@emotion/styled";

import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Nav from "../../component/nav/nav";
import Posts from "../../component/posts/posts";
import RightBar from "../../component/rightBar/rightBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllVents, getListeningVents } from "../../feature/ventSlice";
import { useInfinite } from "../../customHook/useInfinite";
import { useNavigate } from "react-router-dom";

const Home = ({ type }) => {
  const { posts, isLoading } = useSelector((state) => state.vent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [homePage, setHomePage] = useState(1);
  const { page } = useInfinite(homePage, setHomePage);
  useEffect(() => {
    setHomePage(1);
    if (type === "all") {
      dispatch(getAllVents(page));
    } else if (type == "listning") {
      dispatch(getListeningVents("li"));
    }
  }, [type]);
  useEffect(() => {
    if (type === "all") {
      dispatch(getAllVents(page));
    }
  }, [page]);
  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
  });
  const CenterBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <StyledBox>
      <Box flex={"1.2"}>
        <Nav />
        {posts.length ? (
          <Posts posts={posts} />
        ) : (
          !isLoading && (
            <CenterBox maxWidth={"100%"} height={"90vh"}>
              <Typography variant="h5" color="text.secondary">
                No vent for today
              </Typography>
            </CenterBox>
          )
        )}
        {isLoading && (
          <CenterBox height={"90vh"}>
            <CircularProgress size={100} />
          </CenterBox>
        )}
      </Box>
      {/* <Posts saved={true} posts={posts} isLoading={isLoading} /> */}
      <Box flex={"1"}>
        <RightBar />
      </Box>
    </StyledBox>
  );
};

export default Home;
