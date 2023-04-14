import { Card, Typography, Avatar, CardContent, Stack, Divider, Button, CardMedia, Snackbar, Alert, Menu, MenuItem, IconButton } from '@mui/material'
import React, { useEffect, useState, useCallback } from 'react'
import moment from 'moment'
import Reaction from '../ventReaction/reaction'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { followUnfollowUser, removeFromSaved } from '../../feature/userSlice'
import MoreVertIcon from '@mui/icons-material/MoreVert';


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
    ventPhoto,
    rmSaveIcon

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuCLick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRemove = (postId) => {
        dispacth(removeFromSaved(postId))
        handleClose()
    }

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
                </Stack>
                {listenIcon ? !isOurs &&
                    (<><Button sx={{ ml: "auto", bgcolor: "#da254b", "&:hover": { bgcolor: "#da254b" } }} disableElevation onClick={handleClick} variant='contained'>
                        {listen ? "Tune out" : "Listen"}
                    </Button>
                        <Snackbar open={openModal} onClose={handleSnackClose}>
                            <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                                {listen ? `you are now listning to ${userName}` : `you tuned out ${userName}`}
                            </Alert>
                        </Snackbar></>
                    ) :
                    <>
                        {rmSaveIcon &&
                            <><IconButton sx={{ ml: "auto" }}
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleMenuCLick}
                            >
                                <MoreVertIcon />
                            </IconButton><Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                    <MenuItem onClick={() => handleRemove(_id)}>Remove from Saved </MenuItem>

                                </Menu></>}</>
                }

            </Stack>
            {
                ventPhoto != "undefined" && <CardMedia
                    component="img"
                    height="350"
                    image={`http://localhost:5000/${ventPhoto}`}
                    alt="Paella dish"
                />
            }

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
