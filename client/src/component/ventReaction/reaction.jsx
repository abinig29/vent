import { Stack } from '@mui/system'
import { Box, Typography, IconButton, Snackbar, Alert, Divider } from '@mui/material'
import React, { useState } from 'react'
import { Comment, PushPin } from "@mui/icons-material"
import { BsFillEmojiSmileFill, BsEmojiSmile } from "react-icons/bs"
import { FaCommentDots } from "react-icons/fa"
import { FaRegSurprise, FaSurprise } from "react-icons/fa"
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { reactToVent } from "../../feature/ventSlice"
import { saveVent } from '../../feature/userSlice'

const Reaction = ({
    hug,
    smile,
    surprized,
    postId,
    comment,
    savedIcon }) => {

    const [openModal, setOpenModal] = useState(false);
    const dispacth = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)
    const vent = useSelector((state) => state.vent.posts.find(vent => vent._id === postId))
    const isUserVent = vent?.userId === user?._id
    const [reaction, setReaction] = useState({
        smiled: user ? vent?.smile.includes(user._id) : false,
        surprised: user ? vent?.surprized.includes(user._id) : false,
        huged: user ? vent?.hug.includes(user._id) : false,
    })
    // const save = user?.savedThoughts.includes(postId)
    const [test, setTest] = useState(user?.savedThoughts.includes(postId))

    const [reactionNumber, setReactionNumber] = React.useState({
        smiled: smile,
        surprised: surprized,
        huged: hug,

    })
    const handleReaction = (mood) => {
        if (!user)
            return navigate("/login")

        dispacth(reactToVent({ postId, mood }))
        setReaction((pre) => {
            return { ...pre, [mood]: !pre[mood] }
        })
        if (reaction[mood]) {
            setReactionNumber(pre => {
                return { ...pre, [mood]: pre[mood] - 1 }
            })
        }
        else {
            setReactionNumber(pre => {
                return { ...pre, [mood]: pre[mood] + 1 }
            })
        }
    }

    const StyledBox = styled(Box)({
        display: "flex", alignItems: "center"
    })
    const handleSnackOpen = () => {
        dispacth(saveVent(postId))
        setOpenModal(pre => !pre)
        setTest(true)
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenModal(false);
    };

    return (

        <Stack flexDirection={"row"} justifyContent={"space-around"} width={`${100}%`} py={1}>
            <StyledBox >
                <IconButton aria-label="smile" onClick={() => handleReaction("smiled")}>
                    {reaction.smiled ? <BsFillEmojiSmileFill color="#da254b" fontSize={30} /> : <BsEmojiSmile color="#da254b" fontSize={30} />}
                </IconButton>
                <Typography variant="h6" color="text.secondary">{reactionNumber.smiled}</Typography>
                {/* <Typography variant="h6" color="text.secondary">{smile}</Typography> */}

            </StyledBox>
            <StyledBox >
                <IconButton aria-label="share" onClick={() => handleReaction("surprised")}>
                    {reaction.surprised ? <FaSurprise color="#da254b" fontSize={30} /> : <FaRegSurprise color="#da254b" fontSize={30} />}
                </IconButton>
                <Typography variant="h6" color="text.secondary">{reactionNumber.surprised}</Typography>
                {/* <Typography variant="h6" color="text.secondary">{surprized}</Typography> */}

            </StyledBox>
            <StyledBox >
                <Box sx={{ border: "1px solid #da254b", bgcolor: (!reaction.huged) ? "transparent" : "#da254b", p: "2px 8px", borderRadius: 10, cursor: "pointer", }} onClick={() => handleReaction("huged")}>
                    {/* <Typography variant="body2" color="initial" sx={{ color: (reaction.huged) ? "white" : "black" }}>Hug</Typography> */}
                    <Typography variant="body2" color="initial" sx={{ color: (reaction.huged) ? "white" : "black", fontSize: 18 }}>Hug</Typography>

                </Box>
                <Typography variant="h6" color="text.secondary" pl={1}>{reactionNumber.huged}</Typography>
                {/* <Typography variant="h6" color="text.secondary" pl={1}>{hug}</Typography> */}

            </StyledBox>
            {
                comment && <IconButton aria-label="share" onClick={() => { navigate(`/vent/${postId}`) }}>
                    <FaCommentDots color="#da254b" fontSize={30} />
                </IconButton>
            }
            <Box>{
                savedIcon && !isUserVent && (<>
                    <IconButton aria-label="share" onClick={handleSnackOpen} disabled={test}>
                        {<PushPin />}
                    </IconButton>
                    <Snackbar open={openModal} autoHideDuration={6000} onClose={handleSnackClose}>
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
