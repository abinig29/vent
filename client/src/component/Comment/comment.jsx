import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, IconButton } from "@mui/material"
import { Favorite } from "@mui/icons-material"

import moment from "moment"


const Comment = ({ comments }) => {
    return (

        <Box sx={{
            display: 'flex', flexDirection: "column", height: 380, overflow: "scroll", gap: 3, justifyContent: (comments.length === 0) ? "center" : "flex-start",
            "&::-webkit-scrollbar ": {
                display: "none"
            }
        }} p={3} >
            {
                comments.length === 0 ? <Typography variant="body2" color="text.secondary" align='center'>Be the first to comment</Typography> :
                    (comments.map((comment) => {
                        return (
                            <Box sx={{ display: 'flex', alignItems: "flex-start" }} gap={2}>
                                <Avatar src={comment.photo} sx={{ cursor: "pointer" }} />
                                <Box sx={{ display: 'flex', flexDirection: "column" }} >
                                    <Typography fontWeight={600} variant="v6" color="black" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>{comment.userName}</Typography>
                                    <Typography variant="v6" color="black">{comment.comment}</Typography>
                                    <Typography variant="body2" color="text.secondary">{moment(comment.createdAt).fromNow()}</Typography>
                                </Box>
                                {/* <IconButton aria-label="" onClick={() => { console.log("A") }}>
                                <Favorite />
                            </IconButton> */}
                            </Box>
                        )
                    }))
            }
        </Box >
    )
}

export default Comment
