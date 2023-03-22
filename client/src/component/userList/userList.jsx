import React from 'react'
import { Avatar, ListItem, ListItemIcon, ListItemText, ListItemButton, List, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import { Hearing, HearingDisabled } from '@mui/icons-material';
const UserList = ({ height, users, rightIcon }) => {
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
                        <ListItemButton disableTouchRipple>
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
