import styled from "@emotion/styled";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Button,
  Tabs,
  Tab,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editUser, followUnfollowUser } from "../userSlice.js";
import EditProfile from "./edit-profile.jsx";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: curUser } = useSelector((state) => state.user);

  let isUserItself = user?._id === curUser?._id;
  const [doesListen, setDoesListen] = useState(
    curUser?.lisetning.includes(user?._id)
  );

  const [listnerNumber, setListnerNumber] = useState(user?.listener?.length);
  const [open, setOpen] = React.useState(false);
  const [showReactedVent, setShowReactedVent] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleShow = (e) => {
    dispatch(
      editUser({
        body: { showReactedVents: !showReactedVent },
        userId: curUser._id,
      })
    );
    setShowReactedVent(e.target.checked);
  };
  useEffect(() => {
    setDoesListen(curUser?.lisetning.includes(user?._id));
    setListnerNumber(user?.listener?.length);
    setShowReactedVent((pre) => {
      return user?.showReactedVents;
    });
  }, [user]);
  const handleClick = () => {
    if (!user) navigate("/login");
    const changeStatus = () => {
      setDoesListen((pre) => !pre);
      doesListen
        ? setListnerNumber((pre) => pre - 1)
        : setListnerNumber((pre) => pre + 1);
    };

    dispatch(followUnfollowUser({ friendId: user?._id, changeStatus }));
  };

  const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 70,
  });
  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      px={4}
      py={2}
    >
      <Stack width={"60%"} pl={3} gap={1}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={5}>
          <Avatar
            src={`https://vent-now.onrender.com/${user?.coverPhoto}`}
            sx={{ width: 120, height: 120 }}
          >
            <Typography variant="h1" color="#9693a2">
              {user?.userName?.slice(0, 1).toUpperCase()}
            </Typography>
          </Avatar>
          <Stack>
            <Typography variant="h4" color="black" fontWeight={"600"}>
              {user?.userName}
            </Typography>
            {/* { } */}
            {/* <Button variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} >Listen</Button> */}
            {/* <Button variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} >Message</Button> */}
            {!isUserItself && (
              <Button
                disableElevation
                disableTouchRipple
                variant="contained"
                sx={{
                  background: "#da254b",
                  "&:hover": { bgcolor: "#df4263" },
                  mt: 2,
                }}
                onClick={handleClick}
              >
                {doesListen ? "Tune out" : "Listen"}
              </Button>
            )}
            {isUserItself && (
              <>
                <Button
                  disableTouchRipple
                  disableElevation
                  variant="contained"
                  sx={{
                    background: "#da254b",
                    "&:hover": { background: "#df4263" },
                    mt: 2,
                  }}
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </Button>
                <EditProfile open={open} handleClose={handleClose} />
              </>
            )}
          </Stack>
        </Stack>
        <StyledBox
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="body1" color="black">
            {" "}
            Listener <span style={{ fontWeight: 800 }}>{listnerNumber}</span>
          </Typography>
          <Typography variant="body1" color="black">
            {" "}
            Listening{" "}
            <span style={{ fontWeight: 800 }}>{user?.lisetning?.length} </span>
          </Typography>
        </StyledBox>
        {user?.bio
          ? user?.bio.split("\n").map((singleBio) => {
              return (
                <Typography fontWeight={100} variant="body1" color="initial">
                  {singleBio}
                </Typography>
              );
            })
          : ""}
        {isUserItself && (
          <Box>
            <FormControlLabel
              label="Show reacted vents"
              control={
                <Checkbox
                  value=""
                  checked={showReactedVent}
                  onChange={handleShow}
                  style={{ color: "#df4263" }}
                />
              }
            />
          </Box>
        )}

        <Divider />
      </Stack>
    </Box>
  );
};

export default ProfileHeader;
