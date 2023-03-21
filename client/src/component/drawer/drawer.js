import React from "react";
import Drawer from "@mui/material/Drawer";

import {
  HomeOutlined,
  Home,
  Send,
  SendOutlined,
  ManageAccountsOutlined,
  ManageAccounts,
  NotificationsActive,
  NotificationsActiveOutlined,
  Bookmarks,
  BookmarksOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
const list = [
  {
    icon: <Home sx={{ fontSize: "2rem", color: "black" }} />,
    selectedIcon: <HomeOutlined sx={{ fontSize: "2rem", color: "black" }} />,
    text: "Home",
    location: "/home",
  },
  {
    icon: <NotificationsActive sx={{ fontSize: "2rem", color: "black" }} />,
    selectedIcon: (
      <NotificationsActiveOutlined sx={{ fontSize: "2rem", color: "black" }} />
    ),
    text: "Notification",
    location: "/notification",
  },
  {
    icon: <ManageAccounts sx={{ fontSize: "2rem", color: "black" }} />,
    selectedIcon: (
      <ManageAccountsOutlined sx={{ fontSize: "2rem", color: "black" }} />
    ),
    text: "Profile",
    location: "/profile/1234", // location: `/profile/${user._id}`,
  },
  {
    icon: <Send sx={{ fontSize: "2rem", color: "black" }} />,
    selectedIcon: <SendOutlined sx={{ fontSize: "2rem", color: "black" }} />,
    text: "Message",
    location: "/message",
  },
  {
    icon: <Bookmarks sx={{ fontSize: "2rem", color: "black" }} />,
    selectedIcon: (
      <BookmarksOutlined sx={{ fontSize: "2rem", color: "black" }} />
    ),
    text: "Saved",
    location: "/saved",
  },
];

const SideDrawer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //   const { user } = useSelector((state) => {
  //     state.user;
  //   });

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 320,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 320,
          boxSizing: "border-box",
          // background: "#eceaea",
          color: "black",
          border: "1px solid grey",
        },
      }}
    >
      <List
        sx={{
          paddingX: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          onClick={() => {
            navigate("/home", { replace: true });
          }}
          sx={{
            transition: "background-color 0.4s ",
            padding: "10px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
            },
          }}
        >
          <img
            src="http://www.vent.co/vassets/img/logo.png"
            alt=""
            style={{ width: "70px" }}
          />
        </Box>

        {list.map((part, index) => {
          const isSelected = location.pathname === part.location;

          return (
            <ListItem sx={{ padding: "0px" }} key={index}>
              <ListItemButton
                onClick={() => {
                  navigate(part.location, { replace: true });
                }}
              >
                <ListItemIcon>
                  {isSelected ? part.selectedIcon : part.icon}
                </ListItemIcon>
                <ListItemText
                  primary={part.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "22px",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
