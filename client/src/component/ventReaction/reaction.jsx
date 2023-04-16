import { Stack } from '@mui/system'
import { Box, Typography, IconButton, Snackbar, Alert, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Comment, PushPin } from "@mui/icons-material"
import { BiBookmarkHeart } from "react-icons/bi"
import { FaCommentDots, FaRegMeh } from "react-icons/fa"
import { FaRegSurprise, FaSurprise, FaRegComments } from "react-icons/fa"
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { reactToVent } from "../../feature/ventSlice"
import { saveVent } from '../../feature/userSlice'
import { BiSad, } from "react-icons/bi"
import { FaLaughBeam } from "react-icons/fa"




const Reaction = ({
    hug,
    smile,
    surprized,
    postId,
    post,
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
    const [mood, setMood] = useState(null)

    useEffect(() => {

        if (!mood)
            return
        if (!user)
            return navigate("/login")
        let moodtype;
        let reactedPost;
        if (mood === "smiled") moodtype = "smile";
        if (mood === "huged") moodtype = "hug";
        if (mood === "surprised") moodtype = "surprized";
        if (post[moodtype].includes(user._id)) {
            const reactedArray = post[moodtype].filter(userid => userid != user._id)
            reactedPost = {
                ...post,
                [moodtype]: reactedArray,
            };
        } else {
            const reactedArray = [...post[moodtype], user._id]
            reactedPost = {
                ...post,
                [moodtype]: reactedArray,
            };
        }
        if (mood)
            dispacth(reactToVent({ post, mood, reactedPost }))
    }, [mood])

    const [reactionNumber, setReactionNumber] = React.useState({
        smiled: smile,
        surprised: surprized,
        huged: hug,

    })
    const handleReaction = (mood) => {

        setMood(mood)
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
                    {reaction.smiled ? <FaLaughBeam color="#da254b" fontSize={30} /> : <BiSad color="#da254b" fontSize={30} />}
                </IconButton>
                <Typography variant="h6" color="text.secondary">{reactionNumber.smiled}</Typography>
                {/* <Typography variant="h6" color="text.secondary">{smile}</Typography> */}

            </StyledBox>
            <StyledBox >
                <IconButton aria-label="share" onClick={() => handleReaction("surprised")}>
                    {reaction.surprised ? <FaSurprise color="#da254b" fontSize={30} /> : <FaRegMeh color="#da254b" fontSize={30} />}
                </IconButton>
                <Typography variant="h6" color="text.secondary">{reactionNumber.surprised}</Typography>
                {/* <Typography variant="h6" color="text.secondary">{surprized}</Typography> */}

            </StyledBox>



            <StyledBox >
                <Box sx={{ border: "1px solid #da254b", bgcolor: (!reaction.huged) ? "transparent" : "#da254b", p: "2px 6px", borderRadius: 10, cursor: "pointer", }} onClick={() => handleReaction("huged")}>
                    {/* <Typography variant="body2" color="initial" sx={{ color: (reaction.huged) ? "white" : "black" }}>Hug</Typography> */}
                    <Typography variant="body2" color="initial" sx={{ color: (reaction.huged) ? "white" : "black", fontSize: 16 }}>Hug</Typography>

                </Box>
                <Typography variant="h6" color="text.secondary" pl={1}>{reactionNumber.huged}</Typography>
                {/* <Typography variant="h6" color="text.secondary" pl={1}>{hug}</Typography> */}

            </StyledBox>
            {
                comment && <IconButton aria-label="share" onClick={() => { navigate(`/vent/${postId}`) }}>
                    <FaRegComments color="#da254b" fontSize={30} />
                </IconButton>
            }
            <Box>{
                savedIcon && !isUserVent && (<>
                    <IconButton aria-label="share" onClick={handleSnackOpen} disabled={test}>
                        {test ? <BiBookmarkHeart color="#f3b8c4" fontSize={30} /> : <BiBookmarkHeart color="#da254b" fontSize={30} />}
                    </IconButton>
                    {/* <Snackbar open={openModal} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            vent saved successfully!
                        </Alert>
                    </Snackbar> */}
                </>)
            }
            </Box>
        </Stack >

    )
}

export default Reaction
