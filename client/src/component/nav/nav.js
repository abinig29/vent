import { Card, Stack, Avatar, Box, Typography, Divider } from "@mui/material";
import React from "react";
import { HiPhoto } from "react-icons/hi2";
import { SiKakaotalk } from "react-icons/si";
import { RiEmotionSadFill } from "react-icons/ri";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { openModal, openMoodAndModal } from "../../feature/modalSlice.js";
import { useNavigate } from "react-router-dom";

const CreateNav = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenModal = () => {
    !user && navigate("/login");
    user && dispatch(openModal());
  };
  const CustomBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 6,
  });
  return (
    <Card sx={{ px: 4, py: 2, mt: 3 }}>
      <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
        <Avatar
          src={`https://vent-now.onrender.com/${user?.coverPhoto}`}
        ></Avatar>
        <Box
          onClick={() => handleOpenModal()}
          sx={{
            cursor: "pointer",
            bgcolor: "#f4f2f5",
            height: "30px",
            display: "flex",
            alignItems: "center",
            flex: 1,
            borderRadius: 15,
            p: 3,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            What is in yout mind
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <Stack flexDirection={"row"} justifyContent={"space-around"} mt={2}>
        <CustomBox
          onClick={() => handleOpenModal()}
          sx={{
            px: 3,
            py: 1,
            "&:hover": {
              bgcolor: "#e8fafc",
              borderRadius: "30px",
              cursor: "pointer",
            },
          }}
        >
          <HiPhoto fontSize={"30px"} color="#da254b" />
          <Typography variant="body1" color="text.secondary">
            Photo
          </Typography>
        </CustomBox>
        <CustomBox
          onClick={() => handleOpenModal()}
          sx={{
            px: 3,
            py: 1,
            "&:hover": {
              bgcolor: "#e8fafc",
              borderRadius: "30px",
              cursor: "pointer",
            },
          }}
        >
          <SiKakaotalk fontSize={"25px"} color="#da254b" />
          <Typography variant="body1" color="text.secondary">
            Vent
          </Typography>
        </CustomBox>
        <CustomBox
          onClick={() => dispatch(openMoodAndModal())}
          sx={{
            px: 3,
            py: 1,
            "&:hover": {
              bgcolor: "#e8fafc",
              borderRadius: "30px",
              cursor: "pointer",
            },
          }}
        >
          <RiEmotionSadFill fontSize={"25px"} color="#da254b" />
          <Typography variant="body1" color="text.secondary">
            Feeling
          </Typography>
        </CustomBox>
      </Stack>
    </Card>
  );
};

export default CreateNav;
