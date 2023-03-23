import React from 'react'
import { Box, Typography, Avatar, IconButton } from "@mui/material"
import { Favorite } from "@mui/icons-material"

const Comment = () => {
    const comments = [{
        user: "Abel nigus ",
        photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3",
        comment: "this hit so hard men keep it up",
        date: "16hr a ago"
    },
    {
        user: "Abel nigus ",
        photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3",
        comment: "this hit so hard men keep it up",
        date: "16hr a ago"
    },
    {
        user: "Abel nigus ",
        photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3",
        comment: "this hit so hard men keep it up",
        date: "16hr a ago"
    },
    {
        user: "Abel nigus ",
        photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3",
        comment: "this hit so hard men keep it up",
        date: "16hr a ago"
    },
    {
        user: "Abel nigus ",
        photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3",
        comment: "this hit so hard men keep it up",
        date: "16hr a ago"
    }
    ]
    return (
        <Box sx={{
            display: 'flex', flexDirection: "column", height: 380, overflow: "scroll", gap: 3,
            "&::-webkit-scrollbar ": {
                display: "none"
            }
        }} p={3} >
            {
                comments.map((comment) => {
                    return (
                        <Box sx={{ display: 'flex', alignItems: "flex-start" }} gap={2}>
                            <Avatar src={comment.photo} sx={{ cursor: "pointer" }} />
                            <Box sx={{ display: 'flex', flexDirection: "column" }} >
                                <Typography fontWeight={700} variant="v6" color="black" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>{comment.user}</Typography>
                                <Typography variant="v6" color="black">{comment.comment}</Typography>
                                <Typography variant="body2" color="text.secondary">{comment.date}</Typography>
                            </Box>
                            {/* <IconButton aria-label="" onClick={() => { console.log("A") }}>
                                <Favorite />
                            </IconButton> */}
                        </Box>
                    )
                })
            }
        </Box >
    )
}

export default Comment
