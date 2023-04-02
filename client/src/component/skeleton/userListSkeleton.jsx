import { List, Stack } from '@mui/material'
import React from 'react'
import { Skeleton } from '@mui/material'

const UserSkeleton = () => {
    return (
        <List sx={{ px: 3 }}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rounded" width={"70%"} height={"10px"} />
                <Skeleton variant="rounded" width={"10%"} height={"10px"} />
            </Stack >
        </List>
    )
}


const UserListSkeleton = () => {
    return (
        <Stack>
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
        </Stack>
    )
}




export default UserListSkeleton
