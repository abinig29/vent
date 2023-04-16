import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Posts from '../../component/posts/posts'
import { useInfinite } from '../../customHook/useInfinite';
import { getReactedVents, getUserVent } from '../../feature/ventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useFetch } from '../../customHook/useFetch';
import { fetchUser } from '../../api';
import SkeletonLoader from '../../component/skeleton/homeSkeleton';

const PostWrapper = ({ type }) => {
    const { id } = useParams()
    const location = useLocation()
    const { posts, isLoading, doneFetching } = useSelector(state => state.vent)
    const { user, } = useSelector((state) => state.user);
    const { data: displayedUser } = useFetch(fetchUser, id, [user])
    const { page } = useInfinite(type);
    const dispatch = useDispatch();


    useEffect(() => {

        if (type === "userVent" && !doneFetching) {
            dispatch(getUserVent({ page, userId: id }));
        }
        else if (type === "reactedVent" && !doneFetching) {
            dispatch(getReactedVents({ page, userId: id }))
        }
    }, [page]);

    useEffect(() => {

        if (type === "userVent") {
            dispatch(getUserVent({ page, userId: id }));
        }
        else if (type === "reactedVent") {
            dispatch(getReactedVents({ page, userId: id }))
        }
    }, [location.pathname, type]);

    return (

        < Box >
            {posts.length ? user._id != displayedUser._id && type === "reactedVent" ? displayedUser.showReactedVents ? < Posts listenIcon={false} savedIcon={true} />
                : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>Hidden</Box>
                : < Posts listenIcon={false} savedIcon={true} />
                : !isLoading && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>no vent for today</Box>
            }
            {
                isLoading && !doneFetching && (
                    <Box
                        sx={{
                            px: 5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            mt: 3,
                        }}
                    >
                        <SkeletonLoader />
                        <SkeletonLoader />
                    </Box>
                )
            }
        </Box >
    )
}

export default PostWrapper
