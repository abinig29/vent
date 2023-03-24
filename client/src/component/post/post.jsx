import { Box, Card, Typography, CardHeader, Avatar, CardContent, Stack, Divider, Button } from '@mui/material'
import React, { useState } from 'react'
import moment from 'moment'
import Reaction from '../ventReaction/reaction'
import { Link } from 'react-router-dom'



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
    createdAt,
    saved
}) => {
    return (
        <Card >

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
                </Stack>
                <Button sx={{ ml: "auto" }}>
                    Listen
                </Button>

            </Stack>
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
                hug={hug}
                smile={smile}
                surprized={surprized}
                postId={_id} />



        </Card >
    )
}

export default Post
