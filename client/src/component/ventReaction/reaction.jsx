import { Stack } from '@mui/system'
import { Box, Typography, IconButton, Snackbar, Alert, } from '@mui/material'
import React, { useState } from 'react'
import { Comment, PushPin } from "@mui/icons-material"
import { BsFillEmojiSmileFill, BsEmojiSmile } from "react-icons/bs"
import { FaRegSurprise, FaSurprise } from "react-icons/fa"
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'


const Reaction = ({
    hug,
    smile,
    surprized,
    postId,
    width,
    comment,
    saved }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [liked, setLiked] = useState(false)
    const [surprised, setSurprise] = useState(false)
    const [huged, setHug] = useState(false)
    const [save, setSave] = useState(false)
    const navigate = useNavigate()

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
            {comment && <IconButton aria-label="share" >
                <Comment onClick={() => { navigate(`/vent/${postId}`) }} />
            </IconButton>}
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

        </Stack>
    )
}

export default Reaction
