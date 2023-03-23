import { Box, InputBase, Typography, Avatar, ListItem, ListItemIcon, ListItemText, ListItemButton, List } from '@mui/material'
import { borderRadius } from '@mui/system'
import React, { useState } from 'react'
import UserList from '../userList/userList'

const SearchUser = () => {
    const [users, setUsers] = useState([
        {
            userName: "abel",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "eden",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "abel",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "eden",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "eden",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "abel",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "eden",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "abel",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "eden",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },
        {
            userName: "eden",
            photo: "https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"
        },

    ])
    return (
        <Box sx={{ position: "relative" }} width={"100%"}>
            <Box sx={{ bgcolor: "white", borderRadius: "40px" }} px={2} py={1} >
                <InputBase placeholder="search user" bgcolor={"transparent"} />
            </Box>
            {/* <Box position={"absolute"} width={"100%"}>
                <UserList users={users} height={400} />
            </Box> */}
        </Box>

    )
}

export default SearchUser
