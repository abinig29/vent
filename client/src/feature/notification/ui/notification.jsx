import { Box, Card, Stack, Avatar, Typography, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { AiOutlineNotification } from "react-icons/ai"

const EachNotification = () => {
    const { notifications } = useSelector(state => state.notification)
    const navigate = useNavigate()

    const handleClick = (ventId) => {
        navigate(`/vent/${ventId}`)
    }


    return (
        <Stack spacing={2}>

            {
                notifications.map(eachNotification => {
                    return <Paper sx={{ bgcolor: "white", display: "flex", alignItems: "center", gap: 4, px: 6, py: 4, cursor: "pointer", "&:hover": { background: '#dee0df' } }} onClick={() => handleClick(eachNotification.ventId)}>
                        <AiOutlineNotification fontSize={40} color='#da254b' />
                        <Box>
                            <Avatar src={`https://vent-now.onrender.com/${eachNotification.senderPhoto}`} />
                            <Typography fontWeight={700} fontSize={18} textTransform={"capitalize"} variant="h6" color="black">{eachNotification.senderUserName}</Typography>
                            {
                                eachNotification.notificationType === "reacted" && (<Typography fontWeight={600}>
                                    has recently reacted on one of your vents
                                </Typography >)
                            }
                            {
                                eachNotification.notificationType === "commented" && (<Typography fontWeight={600}>
                                    has recently commented on one of your vents
                                </Typography >)
                            }
                            <Typography fontStyle={"italic"} variant="body1" color="initial"> {`http://localhost:3000/vent/${eachNotification.ventId}`}</Typography>
                            <Typography variant="body1" color="text.body"> {eachNotification.ventText.length > 50 ? `${eachNotification.ventText.substr(0, 50)} ....` : eachNotification.ventText}</Typography>
                        </Box>
                    </Paper>
                })
            }
        </Stack >
    )
}

export default EachNotification
