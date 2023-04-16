import { Box } from "@mui/system";
import React from "react";
import Post from "../post/post";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const Posts = React.memo(({ listenIcon, savedIcon, rmSaveIcon }) => {
  const { posts } = useSelector((state) => state.vent);
  return (
    <Box
      // bgcolor={"#eceaea"}
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
      {posts.length ? (
        posts?.map((post) => {
          return (
            <Post
              key={post._id}
              post={post}
              savedIcon={savedIcon}
              listenIcon={listenIcon}
              rmSaveIcon={rmSaveIcon}
            />
          );
        })
      ) : (
        <Box
          flex={1}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="initial">
            No post for today
          </Typography>
        </Box>
      )}
    </Box>
  );
});

export default Posts;
