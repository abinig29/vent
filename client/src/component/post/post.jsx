import { Card, Typography, Avatar, CardContent, Stack, Divider, Button, CardMedia, Snackbar, Alert } from '@mui/material'
import React, { useEffect, useState, useCallback } from 'react'
import moment from 'moment'
import Reaction from '../ventReaction/reaction'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { followUnfollowUser } from '../../feature/userSlice'


const Post = ({
    _id,
    userId,
    userPicturePath,
    userName,
    ventMood,
    ventText,
    tags,
    hug,
    smile,
    comment,
    surprized,
    createdAt,
    savedIcon,
    listenIcon,
    ventPhoto

}) => {
    const { user } = useSelector(state => state.user)
    const dispacth = useDispatch()
    const isOurs = user?._id === userId
    const [openModal, setOpenModal] = useState(false)
    const listen = user?.lisetning.includes(userId)
    const handleClick = () => {

        dispacth(followUnfollowUser(userId))
    }
    const handleSnackClose = (event, reason) => {
        setOpenModal(false);
    };


    return (
        <Card elevation={2} >

            <Stack flexDirection={"row"} p={2} >
                <Avatar aria-label="recipe" src={`http://localhost:5000/${userPicturePath}`} />

                <Stack sx={{ ml: 2 }}>
                    <Typography variant="body2" color="initial" component={Link} to={`/profile/${userId}`} sx={{
                        textDecoration: "none", "&:hover": {
                            textDecoration: "underline"
                        }
                    }}>
                        {`${userName}  is ${ventMood}`} </Typography>
                    <Typography variant="body2" color="text.secondary">{moment(createdAt).fromNow()} </Typography>
                </Stack>{listenIcon && !isOurs &&
                    (<><Button sx={{ ml: "auto", bgcolor: "#da254b", "&:hover": { bgcolor: "#da254b" } }} disableElevation onClick={handleClick} variant='contained'>
                        {listen ? "Tune out" : "Listen"}
                    </Button>
                        <Snackbar open={openModal} onClose={handleSnackClose}>
                            <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                                {listen ? `you are now listning to ${userName}` : `you tuned out ${userName}`}
                            </Alert>
                        </Snackbar></>
                    )
                }

            </Stack>
            <CardMedia
                component="img"
                height="350"
                image={`http://localhost:5000/${ventPhoto}`}
                alt="Paella dish"
            />
            {/* <CardMedia title="" image="https://tse1.mm.bing.net/th?id=OIP.NbfPECA64xbFnmW58MbWDQHaEo&pid=Api&P=0" /> */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {ventText}
                </Typography>
            </CardContent>


            <Divider />
            <Reaction
                width={60}
                comment={true}
                savedIcon={savedIcon}
                hug={hug.length}
                smile={smile.length}
                surprized={surprized.length}
                postId={_id} />



        </Card >
    )
}

export default Post
