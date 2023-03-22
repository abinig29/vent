import { Box } from '@mui/material'
import React from 'react'
import SearchUser from '../searchUser/searchUser'
import Suggestion from '../Suggestion/suggestion'
import UserAccount from '../UserAccount/userAccount'


const RightBar = () => {
    return (

        <Box width={"100%"} height={"100vh"} px={8} py={6} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <SearchUser />
            <UserAccount userName={"Abel"} photo={"https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3"} email={"abinig5@gmial.com"} listener={5} lisetning={7} />
            <Suggestion />
        </Box >
    )
}

export default RightBar