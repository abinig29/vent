import { Box } from "@mui/system";
import React from "react";
import { vent } from "../../data";
import Post from "../post/post";

const Posts = ({ saved }) => {
  return (
    <Box
      // bgcolor={"#eceaea"}
      maxWidth={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        pt: 3,
        px: 8,
      }}
      flex={1}
    >
      {vent.map(
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
              saved={saved}
            />
          );
        }
      )}
    </Box>
  );
};

export default Posts;
