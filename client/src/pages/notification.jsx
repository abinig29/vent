import { Box, Stack, Paper, Divider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EachNotification from "../feature/notification/ui/notification";
import { getUserList } from "../api";
import { useDispatch, useSelector } from "react-redux";
import UserListSkeleton from "../component/skeleton/user-skeleton";
import UserList from "../feature/user/ui/user-list";
import { seenAllNotification } from "../feature/notification/notification";

const Notification = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data },
        } = await getUserList(user._id);
        setLoading(false);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [user]);
  useEffect(() => {
    dispatch(seenAllNotification());
  });
  return (
    <Stack
      flexDirection={"row"}
      width={"100%"}
      bgcolor="#f3f6f8"
      minHeight={"100vh"}
    >
      <Box flex={1}>
        {/* <Box p={5} height={5} width={"100%"}>
          <Typography variant="h5" color="initial">
            Notification
          </Typography>
        </Box> */}
        <Box p={3} height={"80%"}>
          {notifications.length ? (
            <EachNotification />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h5" color="initial">
                No new notification
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box flex={1} sx={{ mt: 25, px: 15 }}>
        <Box position={"fixed"} width={"22%"}>
          <Paper sx={{ borderRadius: 2 }} elevation={2}>
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              py={1}
            >
              People you Listen
            </Typography>
            <Divider />
            {!loading ? (
              <UserList users={users} rightIcon={"listen"} />
            ) : (
              <UserListSkeleton />
            )}
          </Paper>
        </Box>
      </Box>
    </Stack>
  );
};

export default Notification;
