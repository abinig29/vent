import { Box, Stack } from "@mui/system";
import React from "react";
import Typography from "@mui/material/Typography";
import EachNotification from "../../component/notification/notification";

const Notification = () => {
  return (
    <Stack flexDirection={"row"} width={"100%"} height={"100vh"}>
      <Box flex={1}>
        <Box
          sx={{
            position: "sticky",
            top: "0px",
            p: 6,
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(5px)",
            borderBottom: "1px solid black",
          }}
        >
          <Typography variant="h5" color="initial" fontWeight={"700"} sx={{}}>
            Notification
          </Typography>
        </Box>
        <EachNotification />
      </Box>
      <Box flex={1}></Box>
    </Stack>
  );
};

export default Notification;
