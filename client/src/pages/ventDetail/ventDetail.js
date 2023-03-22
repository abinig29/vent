import {
  Modal,
  Box,
  IconButton,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const VentDetail = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
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
        <Box position={"relative"} maxWidth p={5} height={"100%"}>
          <IconButton
            aria-label=""
            onClick={() => {
              console.log("Ab");
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
            <Box bgcolor={"blue"} height={"100%"} flexGrow={1}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                flex={1}
              >
                <Avatar src="https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"></Avatar>
                <Typography variant="h6" color="text.secondary">
                  Abel
                </Typography>
              </Box>
              <Typography variant="body2" color="initial"></Typography>
            </Box>
            <Box flex={1} height={"100%"} bgcolor="red">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatibus repellat possimus maxime sunt deserunt quod ea ipsam
              dicta consequatur dolores incidunt dolor fugit eum ducimus placeat
              ab quae, officiis dolorem.
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default VentDetail;
