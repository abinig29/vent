import React from "react";
import Drawer from "@mui/material/Drawer";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PeopleIcon from "@mui/icons-material/People";
import CreateModal from "../createModal/createModal";
import { openModal, closeModal } from "../../feature/modalSlice";
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
  Add,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Fab,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const { open } = useSelector((state) => state.modal);
  console.log(open);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const handleOpenModal = () => {
    dispatch(openModal());
  };
  const list = [
    {
      selectedIcon: <Home sx={{ fontSize: "2rem", color: "#da254b" }} />,
      icon: <HomeOutlined sx={{ fontSize: "2rem", color: "black" }} />,
      text: "For You",
      location: "/home",
    },
    {
      selectedIcon: <PeopleIcon sx={{ fontSize: "2rem", color: "#da254b" }} />,
      icon: <PeopleAltOutlinedIcon sx={{ fontSize: "2rem", color: "black" }} />,
      text: "Listnening",
      location: "/home/listning",
    },
    {
      selectedIcon: (
        <NotificationsActive sx={{ fontSize: "2rem", color: "#da254b" }} />
      ),
      icon: (
        <NotificationsActiveOutlined
          sx={{ fontSize: "2rem", color: "black" }}
        />
      ),
      text: "Notification",
      location: "/notification",
    },
    {
      selectedIcon: (
        <ManageAccounts sx={{ fontSize: "2rem", color: "#da254b" }} />
      ),
      icon: (
        <ManageAccountsOutlined sx={{ fontSize: "2rem", color: "black" }} />
      ),
      text: "Profile",
      location: `/profile/${user?._id}`, // location: `/profile/${user._id}`,
    },

    {
      selectedIcon: <Bookmarks sx={{ fontSize: "2rem", color: "black" }} />,
      icon: <BookmarksOutlined sx={{ fontSize: "2rem", color: "black" }} />,
      text: "Saved",
      location: "/saved",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: {
          sm: 220,
          lg: 280,
          xl: 310,
        },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: {
            sm: 220,
            lg: 280,
            xl: 310,
          },
          boxSizing: "border-box",
          background: "white",
          color: "black",
          borderRight: "1px solid #e8e7e7",
          px: 5,
        },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
            <ListItem disablePadding key={index}>
              <ListItemButton
                disableTouchRipple
                sx={{
                  borderRadius: "80px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: 3,
                }}
                onClick={() => {
                  navigate(part.location);
                }}
              >
                <ListItemIcon>
                  {isSelected ? part.selectedIcon : part.icon}
                </ListItemIcon>
                <ListItemText
                  primary={part.text}
                  sx={{
                    display: {
                      sm: "none",
                      md: "inline",
                    },
                    "& .MuiListItemText-primary": {
                      fontSize: "22px",
                      fontWeight: isSelected ? "500" : "400",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Box mt={5}>
          <Fab
            aria-label="add"
            sx={{ bgcolor: "#da254b", mt: 5 }}
            onClick={() => {
              handleOpenModal();
            }}
          >
            <Add color="" />
          </Fab>
          <CreateModal open={open} handleClose={handleCloseModal} />
        </Box>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
