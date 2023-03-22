import { Box, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import SearchUser from '../searchUser/searchUser'
import UserList from '../userList/userList'


const Suggestion = () => {
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


    ])
    return (
        <Box sx={{ boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: 2 }} bgcolor={"white"}>
            <Typography variant="h6" color="text.secondary" align='center' py={1}>
                Suggested peoples
            </Typography>
            <Divider />
            <UserList users={users} rightIcon={"listen"} />
        </Box>
    )
}

export default Suggestion
