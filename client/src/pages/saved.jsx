import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";

import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CreateNav from "../component/nav";
import Posts from "../feature/vent/ui/posts";
import RightBar from "../component/rightBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllVents, getListeningVents } from "../feature/vent/ventSlice";
import { useInfinite } from "../customHook/useInfinite";
import { API, getUserList } from "../api";
import SkeletonLoader from "../component/skeleton/home-skeleton";
import { useFetch } from "../customHook/useFetch";
import { useInfiniteQuery } from "@tanstack/react-query";
import Post from "../feature/vent/ui/post";
import { BiLoader } from "react-icons/bi";
import { useParams } from "react-router-dom";

const SavedVent = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const { data: users, loading } = useFetch(getUserList, user?._id, [user]);
  const { isLoading, isError, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["saved-vent"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await API.get(`/user/saved?page=${pageParam}`);
        return res.data.data;
      },
      getNextPageParam: (lastPage, pages) => {
        return pages.length + 1;
      },
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const isEmpty = (pages) => {
    let i = true;
    pages.forEach((val) => {
      if (val.length) return (i = false);
    });
    return i;
  };

  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
  });
  const CenterBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  // if (isEmpty(data?.pages)) return <div>No vent for today</div>;a

  return (
    <div style={{ display: "flex", flexDirection: "row" }} bgcolor="#f3f6f8">
      <Box sx={{ flex: 1 }}>
        {isLoading && (
          <Box
            maxWidth={"100%"}
            minHeight={"100vh"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              pt: 3,
              px: 5,
            }}
            flex={1}
          >
            <SkeletonLoader />
          </Box>
        )}
        {data?.pages?.map((page) => (
          <>
            {page?.length ? (
              <Box
                maxWidth={"100%"}
                minHeight={"100vh"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  pt: 3,
                  px: 5,
                }}
                flex={1}
              >
                {page?.map((post, index) => {
                  if (index === page.length - 1) {
                    return (
                      <div key={post._id} ref={ref}>
                        <Post key={post._id} post={post} rmSaveIcon={true} />
                      </div>
                    );
                  } else {
                    return (
                      <Post key={post._id} post={post} rmSaveIcon={true} />
                    );
                  }
                })}
              </Box>
            ) : null}
          </>
        ))}
      </Box>
      <Box sx={{ flex: 1 }}></Box>
    </div>
  );
};

export default SavedVent;
