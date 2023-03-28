import { Box } from "@mui/system";
import React from "react";
import Post from "../post/post";
import Typography from "@mui/material/Typography";

const Posts = ({ posts }) => {
  return (
    <Box
      // bgcolor={"#eceaea"}
      maxWidth={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        pt: 3,
        px: 5,
      }}
      flex={1}
    >
      {posts.map(
        ({
          _id,
          userId,
          userPicturePath,
          userName,
          ventMood,
          ventText,
          tags,
          feelingSame,
          hug,
          smile,
          surprized,
          createdAt,
        }) => {
          return (
            <Post
              key={_id}
              _id={_id}
              userId={userId}
              userPicturePath={userPicturePath}
              userName={userName}
              ventMood={ventMood}
              ventText={ventText}
              feelingSame={feelingSame}
              hug={hug}
              smile={smile}
              surprized={surprized}
              tags={tags}
              saved={true}
              createdAt={createdAt}
            />
          );
        }
      )}
    </Box>
  );
};

export default Posts;
