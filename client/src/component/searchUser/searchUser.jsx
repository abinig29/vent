import { Box, InputBase, Typography, Avatar, ListItem, ListItemIcon, ListItemText, ListItemButton, List } from '@mui/material'
import { borderRadius } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UserList from '../userList/userList'
import { getUsers } from '../../api'

const SearchUser = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    useEffect(() => {
        if (search.length > 0) {
            const fetch = async () => {
                try {
                    const { data: { data } } = await getUsers(search)
                    setUsers(data)
                } catch (error) {
                }
            }
            fetch()
        }
    }, [search])
    return (

        <Box sx={{ position: "relative" }} width={"100%"}>
            <Box sx={{ bgcolor: "rgba(111,111,111,0.1)", borderRadius: "40px" }} px={2} py={1} >
                <InputBase placeholder="search user" onChange={(e) => setSearch(e.target.value)} />
            </Box>
            {
                search.length ? (<Box position={"absolute"} width={"100%"} bgcolor="rgba(230,230,230,1)" sx={{ zIndex: "5", borderRadius: "20px", boxShadow: "2px 2px 8px rgba(122,122,122,0.8)" }}>
                    {
                        users.length ? <UserList users={users} height={400} /> : <Typography variant="body1" color="initial" p={2} height={150}>No user is found</Typography>
                    }
                </Box>) : null
            }
        </Box>

    )
}

export default SearchUser
