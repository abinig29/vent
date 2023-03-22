import { Box, Card, Typography, CardHeader, Avatar, CardContent, CardActions, IconButton, Button, Snackbar, Alert, Divider } from '@mui/material'
import React, { useState } from 'react'
import moment from 'moment'

import { Comment, PushPin } from "@mui/icons-material"
import { BsFillEmojiSmileFill, BsEmojiSmile } from "react-icons/bs"
import { FaRegSurprise, FaSurprise } from "react-icons/fa"
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'



const Post = ({
    _id,
    userId,
    userPicturePath,
    userName,
    ventMood,
    ventText,
    tags,
    feelingSame,
    hug,
    smile,
    surprized,
    createdAt }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [liked, setLiked] = useState(false)
    const [surprised, setSurprise] = useState(false)
    const [huged, setHug] = useState(false)
    const [save, setSave] = useState(false)
    const navigate = useNavigate()


    const handleSnackOpen = () => {
        setSave(true)
        setOpenModal(true)
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenModal(false);
    };

    const StyledBox = styled(Box)({
        display: "flex", alignItems: "center"
    })

    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={userPicturePath}>
                    </Avatar>
                }
                action={
                    <>
                        <Button aria-label="settings">
                            Listen
                        </Button>
                    </>
                }
                title={`${userName}  is ${ventMood}`}
                subheader={moment(createdAt).fromNow()}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {ventText}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-around", width: "75%", }}>
                <StyledBox >
                    <IconButton aria-label="smile" onClick={() => { setLiked(!liked) }}>
                        {liked ? <BsFillEmojiSmileFill /> : <BsEmojiSmile />}
                    </IconButton>
                    <Typography variant="h6" color="text.secondary">{smile}</Typography>
                </StyledBox>
                <StyledBox >
                    <IconButton aria-label="share" onClick={() => { setSurprise(!surprised) }}>
                        {surprised ? <FaSurprise /> : <FaRegSurprise />}
                    </IconButton>
                    <Typography variant="h6" color="text.secondary">{surprized}</Typography>
                </StyledBox>
                <StyledBox >
                    <Box sx={{ border: "1px solid grey", bgcolor: (!huged) ? "transparent" : "#9e9d9d", p: "2px 8px", borderRadius: 3, cursor: "pointer" }} onClick={() => { setHug(!huged) }}>
                        <Typography variant="body2" color="initial" sx={{ color: (huged) ? "white" : "black" }}>Hug</Typography>
                    </Box>
                    <Typography variant="h6" color="text.secondary" pl={1}>{hug}</Typography>
                </StyledBox>
                {/* <StyledBox >
                    <Box sx={{ border: "1px solid grey", bgcolor: (!same) ? "transparent" : "#9e9d9d", p: "4px 10px", borderRadius: 3, cursor: "pointer" }} onClick={() => { setSame(!same) }}>
                        <Typography variant="body2" color="initial" sx={{ color: (same) ? "white" : "black" }}>Same</Typography>
                    </Box>
                    <Typography variant="h6" color="text.secondary" pl={1}>{feelingSame}</Typography>
                </StyledBox> */}
                <IconButton aria-label="share" >
                    <Comment onClick={() => { navigate("/vent/123") }} />
                </IconButton>
                <Box>
                    <IconButton aria-label="share" onClick={handleSnackOpen} disabled={save} >
                        {<PushPin />}
                    </IconButton>
                    <Snackbar open={openModal} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            vent saved successfully!
                        </Alert>
                    </Snackbar>
                </Box>

            </CardActions>
        </Card >
    )
}

export default Post
