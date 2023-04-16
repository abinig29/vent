import styled from "@emotion/styled";

import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CreateNav from "../../component/nav/nav";
import Posts from "../../component/posts/posts";
import RightBar from "../../component/rightBar/rightBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllVents, getListeningVents } from "../../feature/ventSlice";
import { useInfinite } from "../../customHook/useInfinite";
import { useNavigate } from "react-router-dom";
import { getListeningUser, getUserList } from "../../api";
import axios from "axios";
import SkeletonLoader from "../../component/skeleton/homeSkeleton";
import { useFetch } from "../../customHook/useFetch";

const Home = ({ type }) => {
  const { posts, isLoading, doneFetching } = useSelector((state) => state.vent);
  //create modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // user we are curently listning to
  const { user } = useSelector((state) => state.user);
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { data: users, loading } = useFetch(getUserList, user?._id, [user]);

  const dispatch = useDispatch();
  // page realted
  const { page } = useInfinite(type);

  useEffect(() => {
    if (type === "all" && !doneFetching) {
      dispatch(getAllVents(page));
    } else if (type == "listning" && !doneFetching) {
      dispatch(getListeningVents(page));
    }
  }, [page]);
  useEffect(() => {
    if (type === "all") {
      dispatch(getAllVents(page));
    } else if (type == "listning") {
      dispatch(getListeningVents(page));
    }
  }, [type]);
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
      <Box flex={"1.8"} bgcolor="#f3f6f8">
        <Box px={10}>
          <Box px={5}>
            <CreateNav user={user} />
          </Box>
          {posts.length ? (
            <Posts listenIcon={true} savedIcon={true} />
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
            <Box
              sx={{
                px: 5,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
              }}
            >
              <SkeletonLoader />
              <SkeletonLoader />
            </Box>
          )}
        </Box>
      </Box>
      {/* <Posts saved={true} posts={posts} isLoading={isLoading} /> */}
      <Box
        bgcolor="#f3f6f8"
        flex={"1"}
        sx={{
          display: {
            sm: "none",
            md: "block",
          },
        }}
      >
        <RightBar users={users} loading={loading} />
      </Box>
    </StyledBox>
  );
};

export default Home;
