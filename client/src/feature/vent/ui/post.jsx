import {
  Card,
  Typography,
  Avatar,
  CardContent,
  Stack,
  Divider,
  Button,
  CardMedia,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import Reaction from "./reaction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser, removeFromSaved } from "../../user/userSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQueryClient } from "@tanstack/react-query";

const Post = ({ post, savedIcon, listenIcon, rmSaveIcon }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const isOurs = user?._id === post.userId;
  const [listen, setListen] = useState(user?.lisetning.includes(post.userId));
  const queryClient = useQueryClient();

  const handleClick = () => {
    if (!user) navigate("/login");
    const changeStatus = () => setListen((pre) => !pre);
    dispacth(followUnfollowUser({ friendId: post.userId, changeStatus }));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuCLick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemove = (postId) => {
    const onSucess = () => {
      queryClient.invalidateQueries("saved-vent");
    };

    dispacth(removeFromSaved({ postId, onSucess }));
    handleClose();
  };
  useEffect(() => {
    setListen(user?.lisetning.includes(post.userId));
  }, [user?.lisetning]);
  return (
    <Card elevation={2}>
      <Stack flexDirection={"row"} p={2}>
        <Avatar
          aria-label="recipe"
          src={`https://vent-now.onrender.com/${post.userPicturePath}`}
        />
        <Stack sx={{ ml: 2 }}>
          <Typography
            variant="body2"
            color="initial"
            component={Link}
            to={`/profile/${post.userId}`}
            sx={{
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {`${post.userName}  is ${post.ventMood}`}{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(post.createdAt).fromNow()}{" "}
          </Typography>
        </Stack>
        {listenIcon && !isOurs && (
          <>
            <Button
              sx={{
                ml: "auto",
                bgcolor: "#da254b",
                "&:hover": { bgcolor: "#da254b" },
              }}
              disableElevation
              onClick={handleClick}
              variant="contained"
            >
              {listen ? "Tune out" : "Listen"}
            </Button>
          </>
        )}
        {rmSaveIcon && (
          <>
            <IconButton
              sx={{ ml: "auto" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuCLick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleRemove(post._id)}>
                Remove from Saved{" "}
              </MenuItem>
            </Menu>
          </>
        )}
      </Stack>
      {post.ventPhoto != "undefined" && (
        <CardMedia
          component="img"
          height="350"
          image={`https://vent-now.onrender.com/${post.ventPhoto}`}
          alt="Paella dish"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.ventText}
        </Typography>
      </CardContent>

      <Divider />
      <Reaction
        width={60}
        comment={true}
        savedIcon={savedIcon}
        hug={post.hug.length}
        smile={post.smile.length}
        surprized={post.surprized.length}
        postId={post._id}
        post={post}
      />
    </Card>
  );
};

export default Post;
