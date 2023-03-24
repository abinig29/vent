import React from 'react'
import { Avatar, ListItem, ListItemIcon, ListItemText, ListItemButton, List, IconButton } from '@mui/material'

import { Hearing, HearingDisabled } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const UserList = ({ height, users, rightIcon }) => {
    const navigate = useNavigate()
    return (
        <List sx={{

            height: (height) ? `${height}px` : "auto", bgcolor: "transparent", width: "100%", overflow: (height >= 400) ? "scroll" : "hidden",
            "&::-webkit-scrollbar": {
                display: "none"
            }
        }}>
            {users.map((user) => {
                return (
                    <ListItem disablePadding>
                        <ListItemButton disableTouchRipple onClick={() => navigate(`/profile/1234`)}>
                            <ListItemIcon>
                                <Avatar src={user.photo}>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={user.userName}
                                sx={{
                                    "& .MuiListItemText-primary": {
                                        fontSize: "17px",
                                    },
                                }}
                            />{
                                rightIcon &&
                                (<IconButton aria-label="" >
                                    <Hearing />
                                </IconButton>)
                            }

                        </ListItemButton>


                    </ListItem>
                )
            })}
        </List>
    )
}

export default UserList
