import { Box, Typography, Divider, Paper, ButtonGroup, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchUser from '../searchUser/searchUser'
import UserList from '../userList/userList'
import UserAccount from '../UserAccount/userAccount'
import { useSelector } from 'react-redux'
import { getListeningUser } from '../../api'
import UserListSkeleton from '../skeleton/userListSkeleton'


const RightBar = ({ users, loading }) => {
    return (
        <Box width={"100%"} height={"100vh"} >
            <Box position={"fixed"} sx={{ display: "flex", flexDirection: "column", gap: 3, }} height={"100vh"} width={"27%"} px={3} pt={4}>
                <SearchUser />
                <UserAccount userName={"Abel"} photo={"https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"} email={"abinig5@gmial.com"} listener={5} lisetning={7} />
                <Paper sx={{ borderRadius: 2, }} elevation={2}>
                    <Typography variant="h6" color="text.secondary" align='center' py={1}>
                        People you Listen
                    </Typography>
                    <Divider />
                    {
                        !loading ?
                            <UserList users={users} rightIcon={"listen"} /> : <UserListSkeleton />
                    }
                </Paper>

            </Box >
        </Box>
    )
}

export default RightBar
