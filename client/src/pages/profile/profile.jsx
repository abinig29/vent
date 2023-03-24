import React from "react";
import { Box, Tabs, Tab, } from "@mui/material"
import ProfileHeader from "../../component/profileHeader/profileHeader";
import { Outlet, useNavigate } from "react-router-dom";
const Profile = () => {
  const [value, setValue] = React.useState('');
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue)
  };

  return <Box width={"100%"} bgcolor={"#ebeaeb"} >
    <ProfileHeader />
    <Box sx={{ width: '100%', position: "sticky", top: "0px", pl: 7, bgcolor: "#ebeaeb", zIndex: "5" }} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="" label="Vents" />
        <Tab value="listner" label="Listener" />

      </Tabs>
    </Box>
    <Box sx={{ display: "flex" }}>
      <Outlet />
      <Box flex={1}>
      </Box>
    </Box>
  </Box >
};

export default Profile;
