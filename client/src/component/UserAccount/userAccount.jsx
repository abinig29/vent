import styled from '@emotion/styled'
import { Box, Avatar, Typography, Button } from '@mui/material'
import { bgcolor } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const UserAccount = ({
}) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const CustomBox = styled(Box)({
        display: "flex",

    })
    const CustomTypo = styled(Typography)({
        background: "rgba(100, 100, 100, 0.2)",
        backdropFilter: "blur(5px)",
        padding: 10,
        borderRadius: "50px"

    })

    return (
        <CustomBox flexDirection={"column"} gap={2} bgcolor={"white"} p={2} sx={{ boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: 2 }}>
            {
                user ?
                    (<><CustomBox alignItems={"center"} gap={2}>
                        {/* <Avatar src={photo}>
    </Avatar> */}
                        <CustomBox sx={{ flexDirection: "column", alignItems: "flex-start", }} flex={1}>
                            <Typography variant="body1" sx={{ color: "black", textTransform: "capitalize" }}>{user.userName}</Typography>
                            <Typography variant="body1" color="text.secodary">{user.email}</Typography>
                        </CustomBox>

                    </CustomBox><CustomBox justifyContent={"space-around"}>
                            <CustomTypo variant="body1" sx={{ color: "black" }}>Listener - {user.listener.length}</CustomTypo>
                            <CustomTypo variant="body1" color="text.secodary">Lisetning - {user.lisetning.length}</CustomTypo>
                        </CustomBox></>) :
                    <Button onClick={() => navigate("/login")} disableRipple variant='contained' sx={{
                        bgcolor: "lightgrey", "&:hover": {
                            bgcolor: "lightgray"
                        }
                    }}>Login </Button>

            }
        </CustomBox>

    )
}

export default UserAccount