import React, { useEffect, useState } from "react";
import {
  Box,
  CardContent,
  Card,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import Posts from "../../component/posts/posts";
import { vent } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { useInfinite } from "../../customHook/useInfinite";
import { getSavedvent } from "../../feature/ventSlice";
import axios from "axios";
import UserListSkeleton from "../../component/skeleton/userListSkeleton";
import UserList from "../../component/userList/userList";
import SkeletonLoader from "../../component/skeleton/homeSkeleton";

const Saved = () => {
  const dispatch = useDispatch();
  const { page } = useInfinite(null);
  const { posts, isLoading } = useSelector((state) => state.vent);
  useEffect(() => {
    dispatch(getSavedvent(page));
  }, [page]);

  return (
    <Box
      bgcolor="#f3f6f8"
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Box flex={"1.5"} px={10}>
        {!isLoading && <Posts savedIcon={true} rmSaveIcon={true} />}
        {!isLoading && posts.length && (
          <Typography variant="body2" color="initial">
            no vent
          </Typography>
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
      <Box flex={1} pt={3} pr={5}>
        <Box sx={{ border: "1px solid black" }}>
          <img
            src="https://www.goalcast.com/wp-content/uploads/2019/06/Untitled-design-20-708x398.jpg"
            alt=""
            style={{ width: "100%" }}
          />

          <Box p={4}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              41 motivation quotes that keeps u moving
            </Typography>
            <Typography variant="body1" color="initial" mt={3}>
              by Andrson Mali
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Saved;
