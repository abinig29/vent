import { Card, Typography, Avatar, CardContent, Stack, Divider, Button, CardMedia, Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
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
    saved,
    ventPhoto

}) => {
    const { user } = useSelector(state => state.user)
    const dispacth = useDispatch()
    const isOurs = user?._id === userId
    const [openModal, setOpenModal] = useState(false)
    const [listen, setListen] = useState(user?.lisetning.includes(userId))
    const handleClick = () => {
        dispacth(followUnfollowUser(userId))
        setOpenModal(true)
        setListen(pre => !pre)

    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenModal(false);
    };


    return (
        <Card elevation={2} >

            <Stack flexDirection={"row"} p={2} >
                <Avatar aria-label="recipe" src={userPicturePath} />
                <Stack sx={{ ml: 2 }}>
                    <Typography variant="body2" color="initial" component={Link} to={`/profile/1234`} sx={{
                        textDecoration: "none", "&:hover": {
                            textDecoration: "underline"
                        }
                    }}>
                        {`${userName}  is ${ventMood}`} </Typography>
                    <Typography variant="body2" color="text.secondary">{moment(createdAt).fromNow()} </Typography>
                </Stack>{
                    !isOurs &&
                    (<><Button sx={{ ml: "auto" }} onClick={handleClick}>
                        {listen ? "Tune out" : "Listen"}
                    </Button>
                        <Snackbar open={openModal} autoHideDuration={6000} onClose={handleSnackClose}>
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
                saved={saved}
                hug={hug.length}
                smile={smile.length}
                surprized={surprized.length}
                postId={_id} />



        </Card >
    )
}

export default Post
