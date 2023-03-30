import { Box, Typography, Divider, Paper } from '@mui/material'
import React, { useState } from 'react'
import SearchUser from '../searchUser/searchUser'
import UserList from '../userList/userList'
import UserAccount from '../UserAccount/userAccount'


const RightBar = () => {
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
        <Box width={"100%"} height={"100vh"}>
            <Box position={"fixed"} sx={{ display: "flex", flexDirection: "column", gap: 3, borderLeft: "1px solid #e8e7e7", }} height={"100vh"} width={"27%"} px={3} pt={4}>
                <SearchUser />
                <UserAccount userName={"Abel"} photo={"https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"} email={"abinig5@gmial.com"} listener={5} lisetning={7} />
                <Paper sx={{ borderRadius: 2, bgcolor: "rgba(200,200,200,0.1)" }} elevation={2}>
                    <Typography variant="h6" color="text.secondary" align='center' py={1}>
                        People you Listen
                    </Typography>
                    <Divider />
                    <UserList users={users} rightIcon={"listen"} />
                </Paper>
            </Box >
        </Box>
    )
}

export default RightBar
