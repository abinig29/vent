import {
  Modal,
  Box,
  IconButton,
  Avatar,
  Typography,
  Stack,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Comment from "../../component/Comment/comment";
import Reaction from "../../component/ventReaction/reaction";

const VentDetail = () => {
  const navigate = useNavigate();
  const [post, setPost] = React.useState({
    _id: "6415b0d1aef39ae82c93389d",
    userId: "6415a045d7154777b2bc3121",
    userPicturePath:
      "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3",
    userName: "abel",
    ventMood: "tired",
    ventText:
      "😘First time doing this so bare with me ,This one is something that's been on my mind for a while..for anyone who has been exposed to qorn from a young age and who is addicted...how do y'all keep going in life through the guilt, depression,loss of self esteem etc...and anyone who's no longer addicted. How did you overcome the temptation?",
    tags: ["afraied"],
    feelingSame: 2,
    hug: 3,
    smile: 3,
    surprized: 7,
    createdAt: "2023-03-18T12:38:41.848+00:00",
  });
  const [open, setOpen] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "80vh",
    bgcolor: "white",
    outline: "none",
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
            <Box height={"100%"} flex={1}>
              <Reaction
                width={100}
                hug={post.hug}
                smile={post.smile}
                surprized={post.surprized}
                postId={post._id}
              />
              <Box
                sx={{
                  height: "80%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <Typography variant="body2" color="initial">
                  "Okay so i don't know why I am writing this but am feeling so
                  sad no one to talk to( even if I want to I don't want to for
                  some reasons) no one listens no one cares not that anybody
                  cares. Just learn to standalone when u r sad the ugliest
                  timing for me tho for this"
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
                <Avatar src="https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"></Avatar>
                <Typography variant="body2" color="text.secondary">
                  Abel Nigus
                </Typography>
              </Box>
              <Divider />
              <Comment />
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
                <Button disableTouchRipple>Post</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default VentDetail;
