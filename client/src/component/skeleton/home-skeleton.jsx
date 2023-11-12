import React from 'react'
import { Card, Stack, Skeleton, CardContent, Box } from '@mui/material'

const SkeletonLoader = () => {
    return (
        <Card elevation={2} maxWidth={"100%"} >

            <Box p={2} sx={{ display: "flex", alignItems: "center" }} >
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
                <Box sx={{ width: "100%", display: "flex", flexDirection: 'column', ml: 3 }}>
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton sx={{ height: 10 }} animation="wave" width="30%" />
                </Box>


            </Box>
            <Skeleton sx={{ height: 370 }} animation="wave" variant="rectangular" />
            {/* <CardMedia title="" image="https://tse1.mm.bing.net/th?id=OIP.NbfPECA64xbFnmW58MbWDQHaEo&pid=Api&P=0" /> */}
            <CardContent>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
            </CardContent>
        </Card >
    )
}

export default SkeletonLoader