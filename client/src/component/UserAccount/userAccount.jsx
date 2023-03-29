import styled from '@emotion/styled'
import { Box, Avatar, Typography, Button, IconButton, Paper } from '@mui/material'
import { bgcolor } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdSpatialAudioOff, MdSpatialAudio } from "react-icons/md"


const UserAccount = ({
}) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const CustomBox = styled(Box)({
        display: "flex",

    })
    const CustomTypo = styled(Typography)({
        backdropFilter: "blur(5px)",
        padding: 10,
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        gap: "5px"


    })

    return (
        <Paper sx={{ borderRadius: 2, p: 2 }} elevation={2}>
            {
                user ?
                    (<> <Typography variant="body1" color="text.secondary">Your Page and profile</Typography>
                        <CustomBox alignItems={"center"} gap={1}>

                            <CustomBox sx={{ alignItems: "center", }} flex={1} gap={2}>
                                <IconButton aria-label="" onClick={() => navigate(`/profile/${user._id}`)} sx={{ "&:hover": { bgcolor: "transparent" } }}>
                                    <Avatar src="https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0" />
                                </IconButton>
                                <Typography variant="body1" sx={{ color: "black", textTransform: "capitalize", "&:hover": { textDecoration: "underline", cursor: 'pointer' } }} onClick={() => navigate(`/profile/${user._id}`)}>{user.userName}</Typography>
                                {/* <Typography variant="body1" color="text.secodary">{user.email}</Typography> */}
                            </CustomBox>

                        </CustomBox><CustomBox justifyContent={"flex-start"}>
                            <CustomTypo variant="body1" color="text.secodary"><MdSpatialAudioOff fontSize={"25px"} />  {<Typography variant="h6" color="initial">{user.lisetning.length}</Typography>}</CustomTypo>
                            <CustomTypo variant="body1" sx={{ color: "black" }}><MdSpatialAudio fontSize={"25px"} />  {<Typography variant="h6" color="initial">{user.listener.length}</Typography>}</CustomTypo>
                        </CustomBox></>) :
                    <Button onClick={() => navigate("/login")} disableRipple variant='contained' sx={{
                        bgcolor: "lightgrey", "&:hover": {
                            bgcolor: "lightgray"
                        }
                    }}>Login </Button>

            }
        </Paper>

    )
}

export default UserAccount