import { Stack } from "@mui/system";
import {
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiBookmarkHeart } from "react-icons/bi";
import { FaRegMeh } from "react-icons/fa";
import { FaSurprise, FaRegComments } from "react-icons/fa";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reactToVent } from "../ventSlice";
import { saveVent } from "../../user/userSlice";
import { BiSad } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

const Reaction = ({
  hug,
  smile,
  surprized,
  postId,
  post,
  comment,
  savedIcon,
}) => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const onSucess = () => {
    queryClient.invalidateQueries("reacted-vent");
    queryClient.invalidateQueries("all-vent");
    queryClient.invalidateQueries("own-vent");
    queryClient.invalidateQueries("saved-vent");
  };

  const isUserVent = post?.userId === user?._id;

  const [saved, setSaved] = useState(user?.savedThoughts.includes(postId));
  const [reaction, setReaction] = useState({
    smiled: user ? post?.smile.includes(user._id) : false,
    surprised: user ? post?.surprized.includes(user._id) : false,
    huged: user ? post?.hug.includes(user._id) : false,
  });
  const [reactionNumber, setReactionNumber] = React.useState({
    smiled: smile,
    surprised: surprized,
    huged: hug,
  });

  const handleReaction = (mood) => {
    if (!user) return navigate("/login");
    const changeSatus = () => {
      if (reaction[mood]) {
        setReactionNumber((pre) => {
          return { ...pre, [mood]: pre[mood] - 1 };
        });
        setReaction((pre) => ({
          ...pre,
          [mood]: false,
        }));
      } else {
        setReactionNumber((pre) => {
          return { ...pre, [mood]: pre[mood] + 1 };
        });
        setReaction((pre) => ({
          ...pre,
          [mood]: true,
        }));
      }
    };
    dispacth(reactToVent({ post, mood, changeSatus, onSucess }));
  };
  useEffect(() => {
    setReaction({
      smiled: user ? post?.smile.includes(user._id) : false,
      surprised: user ? post?.surprized.includes(user._id) : false,
      huged: user ? post?.hug.includes(user._id) : false,
    });
    setReactionNumber({
      smiled: smile,
      surprised: surprized,
      huged: hug,
    });
  }, [post]);

  const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
  });
  const handleSnackOpen = () => {
    dispacth(saveVent({ postId, onSucess }));
    setOpenModal((pre) => !pre);
    setSaved(true);
  };

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-around"}
      width={`${100}%`}
      py={1}
    >
      <StyledBox>
        <IconButton aria-label="smile" onClick={() => handleReaction("smiled")}>
          {reaction.smiled ? (
            <FaLaughBeam color="#da254b" fontSize={30} />
          ) : (
            <BiSad color="#da254b" fontSize={30} />
          )}
        </IconButton>
        <Typography variant="h6" color="text.secondary">
          {reactionNumber.smiled}
        </Typography>
      </StyledBox>
      <StyledBox>
        <IconButton
          aria-label="share"
          onClick={() => handleReaction("surprised")}
        >
          {reaction.surprised ? (
            <FaSurprise color="#da254b" fontSize={30} />
          ) : (
            <FaRegMeh color="#da254b" fontSize={30} />
          )}
        </IconButton>
        <Typography variant="h6" color="text.secondary">
          {reactionNumber.surprised}
        </Typography>
      </StyledBox>

      <StyledBox>
        <Box
          sx={{
            border: "1px solid #da254b",
            bgcolor: !reaction.huged ? "transparent" : "#da254b",
            p: "2px 6px",
            borderRadius: 10,
            cursor: "pointer",
          }}
          onClick={() => handleReaction("huged")}
        >
          <Typography
            variant="body2"
            color="initial"
            sx={{ color: reaction.huged ? "white" : "black", fontSize: 16 }}
          >
            Hug
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" pl={1}>
          {reactionNumber.huged}
        </Typography>
      </StyledBox>
      {comment && (
        <IconButton
          aria-label="share"
          onClick={() => {
            navigate(`/vent/${postId}`);
          }}
        >
          <FaRegComments color="#da254b" fontSize={30} />
        </IconButton>
      )}
      <Box>
        {savedIcon && !isUserVent && (
          <>
            <IconButton
              aria-label="share"
              onClick={handleSnackOpen}
              disabled={saved}
            >
              {saved ? (
                <BiBookmarkHeart color="#f3b8c4" fontSize={30} />
              ) : (
                <BiBookmarkHeart color="#da254b" fontSize={30} />
              )}
            </IconButton>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Reaction;
