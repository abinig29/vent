import { Stack } from '@mui/system'
import { Box, Typography, IconButton, Snackbar, Alert, } from '@mui/material'
import React, { useState } from 'react'
import { Comment, PushPin } from "@mui/icons-material"
import { BsFillEmojiSmileFill, BsEmojiSmile } from "react-icons/bs"
import { FaRegSurprise, FaSurprise } from "react-icons/fa"
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"


const Reaction = ({
    hug,
    smile,
    surprized,
    postId,
    width,
    comment,
    saved }) => {

    const [openModal, setOpenModal] = React.useState(false);
    const dispacth = useDispatch()
    const navigate = useNavigate()
    const [save, setSave] = useState(false)
    const { user } = useSelector((state) => state.user)
    const vent = useSelector((state) => state.vent.posts.find(vent => vent._id === postId))
    const [reaction, setReaction] = React.useState({
        smiled: user ? vent.smile.includes(user._id) : false,
        smileNumber: smile,
        surprised: user ? vent.surprized.includes(user._id) : false,
        surprizeNumber: surprized,
        huged: user ? vent.hug.includes(user._id) : false,
        hugNumber: hug,
        saved: user?.savedThough?.includes(postId)
    })

    const handleReaction = (mood) => {
        setReaction((pre) => {
            return { ...pre, [mood]: !pre[mood] }
        })
    }

    const StyledBox = styled(Box)({
        display: "flex", alignItems: "center"
    })
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

    return (
        <Stack flexDirection={"row"} justifyContent={"space-around"} width={`${width}%`} py={2}>
            <StyledBox >
                <IconButton aria-label="smile" onClick={() => handleReaction("smiled")}>
                    {reaction.smiled ? <BsFillEmojiSmileFill /> : <BsEmojiSmile />}
                </IconButton>
                <Typography variant="h6" color="text.secondary">{reaction.smileNumber}</Typography>
            </StyledBox>
            <StyledBox >
                <IconButton aria-label="share" onClick={() => handleReaction("surprised")}>
                    {reaction.surprised ? <FaSurprise /> : <FaRegSurprise />}
                </IconButton>
                <Typography variant="h6" color="text.secondary">{reaction.surprizeNumber}</Typography>
            </StyledBox>
            <StyledBox >
                <Box sx={{ border: "1px solid grey", bgcolor: (!reaction.huged) ? "transparent" : "#9e9d9d", p: "2px 8px", borderRadius: 3, cursor: "pointer" }} onClick={() => handleReaction("huged")}>
                    <Typography variant="body2" color="initial" sx={{ color: (reaction.huged) ? "white" : "black" }}>Hug</Typography>
                </Box>
                <Typography variant="h6" color="text.secondary" pl={1}>{reaction.hugNumber}</Typography>
            </StyledBox>
            {
                comment && <IconButton aria-label="share" onClick={() => { navigate(`/vent/${postId}`) }}>
                    <Comment />
                </IconButton>
            }
            <Box>{
                saved && (<>
                    <IconButton aria-label="share" onClick={handleSnackOpen} disabled={save}>
                        {<PushPin />}
                    </IconButton><Snackbar open={openModal} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            vent saved successfully!
                        </Alert>
                    </Snackbar>
                </>)
            }
            </Box>

        </Stack >
    )
}

export default Reaction
