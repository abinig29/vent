import React, { useEffect } from 'react'
import { Modal, Box, Stack, Typography, IconButton, Divider, TextField, InputBase, Button } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

const EditProfile = ({ open, handleClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 420,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: "20px",
        px: 3


    };

    const CustomBox = styled(Box)({
        display: 'flex', alignItems: "center",
    })
    const [button, setButton] = React.useState(true)
    const [input, setInput] = React.useState({ name: "", email: "", bio: "" })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }
    useEffect(() => {
        if (JSON.stringify(input) === JSON.stringify({ name: "", email: "", bio: "" }))
            setButton(true)
        else {
            setButton(false)
        }
    }, [input])
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} py={2}>
                    <Typography variant="h6" color="text.secondary">Edit profile</Typography>
                    <IconButton aria-label="" onClick={() => {
                        handleClose()
                        setInput({ name: "", email: "", bio: "" })
                    }} sx={{
                        bgcolor: "rgba(233,233,233,0.8)"
                    }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack spacing={3} p={5}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" color={"text.secondary"} fontWeight={700} >User Name</Typography>
                        <TextField
                            id=""
                            name='name'
                            value={input.name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" color={"text.secondary"} fontWeight={700} >Email</Typography>
                        <TextField
                            id=""
                            name='email'
                            value={input.email}
                            onChange={handleChange}

                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" color={"text.secondary"} fontWeight={700} >Bio</Typography>
                        <TextField
                            id=""
                            name='bio'
                            value={input.bio}
                            onChange={handleChange}
                        />
                    </Box>
                    <Button variant='contained' fullWidth disabled={button}>
                        save
                    </Button>

                </Stack>
            </Box>

        </Modal>
    )
}

export default EditProfile
