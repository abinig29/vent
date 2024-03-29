import { Box, Typography, Divider, Paper, ButtonGroup, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchUser from '../feature/vent/ui/searchUser'
import UserList from '../feature/user/ui/user-list'
import UserAccount from '../feature/user/ui/user-account'
import { useSelector } from 'react-redux'
import UserListSkeleton from './skeleton/user-skeleton'


const RightBar = ({ users, loading }) => {
    const { user } = useSelector((state) => state.user);

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
                            <UserList users={users} rightIcon={"listen"} /> : user && <UserListSkeleton />
                    }
                </Paper>

            </Box >
        </Box>
    )
}

export default RightBar
