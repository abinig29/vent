import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, } from "@mui/material"
import ProfileHeader from "../../component/profileHeader/profileHeader";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import Posts from "../../component/posts/posts";
import { useSelector, useDispatch } from "react-redux";
import { useInfinite } from "../../customHook/useInfinite";
import { getUserVent } from "../../feature/ventSlice";
import { fetchUser } from "../../api";
const Profile = () => {
  const { id } = useParams()
  const [value, setValue] = React.useState('');
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue)
  };
  // const { posts, isLoading } = useSelector((state) => state.vent);
  const dispatch = useDispatch();
  const [displayedUser, setDisplayedUser] = useState(null);
  const [homePage, setHomePage] = useState(1);
  const { page } = useInfinite(homePage, setHomePage);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: { data } } = await fetchUser(id)
        setDisplayedUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [user]);
  useEffect(() => {
    dispatch(getUserVent({ page, userId: id }));
  }, [page]);

  return <Box width={"100%"} bgcolor={"#ebeaeb"} >
    <ProfileHeader user={displayedUser} />
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
