import { Box, Card, Typography, CardHeader, Avatar, CardContent, CardActions, IconButton, Button, Snackbar, Alert, Divider } from '@mui/material'
import React, { useState } from 'react'
import moment from 'moment'

import { Comment, PushPin } from "@mui/icons-material"
import { BsFillEmojiSmileFill, BsEmojiSmile } from "react-icons/bs"
import { FaRegSurprise, FaSurprise } from "react-icons/fa"
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'
import Reaction from '../ventReaction/reaction'



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
            <Reaction
                width={60}
                comment={true}
                hug={hug}
                smile={smile}
                surprized={surprized}
                postId={_id} />



        </Card >
    )
}

export default Post
