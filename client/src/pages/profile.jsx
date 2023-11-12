import React from "react";
import { Box, Tabs, Tab, Card, CardContent, Typography, Paper, Divider } from "@mui/material"
import ProfileHeader from "../feature/user/ui/profile-header";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, getUserList } from "../api";
import UserListSkeleton from "../component/skeleton/user-skeleton";
import UserList from "../feature/user/ui/user-list";
import { useFetch } from "../customHook/useFetch";
const Profile = () => {
  const { id } = useParams()
  const location = useLocation()
  const [value, setValue] = React.useState('');
  const { user, Token } = useSelector((state) => state.user);
  const { data: users, loading } = useFetch(getUserList, id, [user, location])
  const { data: displayedUser } = useFetch(fetchUser, id, [user, location])
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue)
  };
  // const { posts, isLoading } = useSelector((state) => state.vent);
  // const [displayedUser, setDisplayedUser] = useState(null);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const { data: { data } } = await fetchUser(id)
  //       setDisplayedUser(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetch()
  // }, [user, location]);


  return <Box  width={"100%"} bgcolor="#f3f6f8" sx={{ minHeight: '100vh' }}>
    <ProfileHeader user={displayedUser} />
    <Box sx={{ width: '100%', position: "sticky", top: "0px", pl: 7, bgcolor: "#f3f6f8", zIndex: "5" }} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="" label="Vents" />
        <Tab value="reacted" label="Reacted" />

      </Tabs>
    </Box>
    <Box sx={{ display: "flex" }}>
      <Box flex={1}>
        <Outlet />
      </Box>
      <Box flex={1}>
        {/* <Box width={"100%"} height={"100vh"} > */}
        <Box
          // position={"fixed"}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          height={"100vh"}
          width={"77%"}
          px={3}
          pt={4}
        >

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
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                As soon as something stops being fun, I think it’s time to move on.
                Life is too short to be unhappy. Waking up stressed and miserable is not a good way to live.
                <br />
                RICHARD BRANSON
              </Typography>
            </CardContent>
          </Card>
        </Box>
        {/* </Box> */}
      </Box>

    </Box>
  </Box >
};

export default Profile;
