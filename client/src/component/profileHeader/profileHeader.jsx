import styled from "@emotion/styled"
import { Box, Avatar, Typography, Stack, Button, Tabs, Tab, Divider } from '@mui/material'
import { bgcolor } from '@mui/system'
import React from 'react'
import { useNavigate } from "react-router-dom"
import EditProfile from "../EditProfile/editProfile.jsx"

const ProfileHeader = () => {
    const navigate = useNavigate()

    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(newValue)
    };


    const StyledBox = styled(Box)({
        display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 70
    })
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }} p={4} >
            <Stack width={"40%"} pl={3} gap={1} >
                <Stack flexDirection={"row"} alignItems={"center"} gap={5} >
                    <Avatar
                        alt="Remy Sharp"
                        src="https://tse4.mm.bing.net/th/id/OIP.WN1tO7lGJt0LRyoYV_P1AQHaHa?pid=ImgDet&rs=1"
                        sx={{ width: 150, height: 150, border: "2px solid black" }}
                    />
                    <Stack>
                        <Typography variant="h5" color="text.secondary">Abel Nigus</Typography>
                        {/* { } */}
                        {/* <Button variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} >Listen</Button> */}
                        {/* <Button variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} >Message</Button> */}
                        <Button disableTouchRipple variant='contained' sx={{ background: "rgba(111,111,111,0.5)", mt: 2 }} onClick={() => setOpen(true)} >Edit Profile</Button>
                        <EditProfile open={open} handleClose={handleClose} />

                    </Stack>
                </Stack>
                <StyledBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} >
                    <Typography variant="body1" color="black">  234 <span>Listener</span></Typography>
                    <Typography variant="body1" color="black">   234 <span>Listening</span></Typography>

                </StyledBox>
                <Typography variant="h6" color="initial">
                    Ethiopia 💚💛♥️
                </Typography>
                <Divider />
                <Box sx={{ width: '100%' }} >
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
            </Stack>
        </Box >

    )
}

export default ProfileHeader
