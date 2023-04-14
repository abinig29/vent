import {
  Modal,
  Box,
  IconButton,
  Avatar,
  Typography,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "../../component/Comment/comment";
import Reaction from "../../component/ventReaction/reaction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVent } from "../../feature/ventSlice";
import { getComment, postComment } from "../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "80vh",
  bgcolor: "white",
  outline: "none",
};

const VentDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, reactionLoading } = useSelector((state) => state.vent);
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data },
        } = await getComment(id);
        setComments(data);
      } catch (error) {}
    };
    fetch();
    dispatch(getVent(id));
  }, []);
  const handlePost = async () => {
    const {
      data: { data },
    } = await postComment({
      userId: user._id,
      ventId: id,
      userPicturePath: user?.coverPhoto,
      userName: user.userName,
      comment,
    });
    setComments((pre) => [data, ...pre]);
    setComment("");
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        navigate(-1);
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {reactionLoading ? (
          <CircularProgress />
        ) : (
          <Box maxWidth height={"100%"}>
            <IconButton
              aria-label=""
              onClick={() => {
                navigate(-1);
                setOpen(false);
              }}
              sx={{
                position: "absolute",
                top: "5px",
                right: "20px",
                bgcolor: "rgba(233,233,233,0.8)",
              }}
            >
              <Close />
            </IconButton>
            <Box height={"100%"} sx={{ display: "flex" }}>
              <Box height={"100%"} flex={1.5}>
                <Reaction
                  width={100}
                  hug={post?.hug.length}
                  smile={post?.smile.length}
                  surprized={post?.surprized.length}
                  postId={post._id}
                />
                {/* <Divider /> */}
                <Box
                  sx={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                  }}
                >
                  <Box sx={{ overflow: "hidden" }}>
                    <img
                      style={{ maxWidth: "100%" }}
                      src={`http://localhost:5000/${post?.ventPhoto}`}
                      alt=""
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {post?.ventText}
                  </Typography>
                </Box>
              </Box>
              <Box
                flex={1}
                height={"100%"}
                sx={{
                  borderLeft: "1px solid grey",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    p: 1.5,
                  }}
                  flex={1}
                >
                  <Avatar
                    src={`http://localhost:5000/${post.userPicturePath}`}
                  ></Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {post.userName}
                  </Typography>
                </Box>
                <Divider />
                <Comment comments={comments} />
                <Divider />
                <Box sx={{ display: "flex" }} p={2} gap={1}>
                  <TextField
                    id=""
                    multiline
                    maxRows={2}
                    placeholder="write your comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    style={{ width: "80%" }}
                  />
                  <Button
                    disableTouchRipple
                    onClick={handlePost}
                    disabled={comment.length === 0}
                    variant="contained"
                    sx={{
                      bgcolor: "#da254b",
                      "&:hover": { background: "#df4263" },
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default VentDetail;
