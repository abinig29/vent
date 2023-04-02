import styled from "@emotion/styled"
import { Box, Avatar, Typography, Stack, Button, Tabs, Tab, Divider } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { followUnfollowUser } from "../../feature/userSlice.js"
import EditProfile from "../EditProfile/editProfile.jsx"
import { useDispatch } from "react-redux"

const ProfileHeader = ({ user }) => {
    const dispatch = useDispatch()
    const { user: curUser } = useSelector(state => state.user)
    const isUserItself = user?._id === curUser?._id
    const doesListen = curUser?.lisetning.includes(user?._id)
    const [listnerNumber, setListnerNumber] = useState(user?.listener.length)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        setListnerNumber(user?.listener.length)
    }, [user])
    const handleClick = () => {
        doesListen ? setListnerNumber(pre => pre - 1) : setListnerNumber(pre => pre + 1)
        dispatch(followUnfollowUser(user?._id))
    }
    const StyledBox = styled(Box)({
        display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 70
    })
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }} px={4} py={2} >
            <Stack width={"40%"} pl={3} gap={1} >
                <Stack flexDirection={"row"} alignItems={"center"} gap={5} >
                    <Avatar
                        src={`http://localhost:5000/${user?.coverPhoto}`}
                        sx={{ width: 150, height: 150, border: "2px solid black" }}
                    >
                        <Typography variant="h1" color="#9693a2">{user?.userName.slice(0, 1).toUpperCase()}</Typography>
                    </Avatar >
                    <Stack>
                        <Typography variant="h5" color="text.secondary">{user?.userName}</Typography>
                        {/* { } */}
                        {/* <Button variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} >Listen</Button> */}
                        {/* <Button variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} >Message</Button> */}
                        {!isUserItself && <Button disableTouchRipple variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} onClick={handleClick}>
                            {doesListen ? "Tune out" : "Listen"}
                        </Button>}
                        {isUserItself && <>
                            <Button disableTouchRipple variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} onClick={() => setOpen(true)}>Edit Profile</Button>
                            <EditProfile open={open} handleClose={handleClose} /></>}

                    </Stack>
                </Stack>
                <StyledBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} >
                    <Typography variant="body1" color="black">  {listnerNumber} <span>Listener</span></Typography>
                    <Typography variant="body1" color="black">   {user?.lisetning.length} <span>Listening</span></Typography>

                </StyledBox>
                <Typography variant="body1" color="text.secondary">
                    {user?.bio && user?.bio}
                </Typography>
                <Divider />

            </Stack>
        </Box >

    )
}

export default ProfileHeader
