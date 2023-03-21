import React, { useState } from 'react'
import { Modal, Box, Typography, Divider, IconButton, Avatar, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Height } from '@mui/icons-material';
import Picker from "@emoji-mart/react"
import Data from "@emoji-mart/data"

const CreateModal = ({ open, handleClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',

        boxShadow: 24,

    };
    const [text, setText] = useState("")
    const [mood, setMood] = useState("proud")
    // const [openEmoji, setOpenEmoji] = useState(false)

    const handleEmojiClick = (e) => {
        setText(pre => pre + e.native)
        // setOpenEmoji(false)
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box position={"relative"} p={4} >
                    <IconButton aria-label="" onClick={() => { console.log("abel") }} sx={{
                        position: "absolute", top: "5px", right: "20px", bgcolor: "rgba(233,233,233,0.8)"
                    }}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="initial" align='center' fontWeight={700}>Create Vent</Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', mt: 2, alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                            <Avatar src="https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3" alt='Abel' />
                            <Typography variant="body1" color="text.secondary" ml={2}>Abel Nigus{mood && ` --> is ${mood}`}</Typography>
                            <Button>
                                Mood
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2, alignItems: "center" }} mt={5}>
                        <TextField
                            id="tetx"
                            label="enter your vent"
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}
                            fullWidth
                            multiline
                            rows={5}


                        />
                        {/* <IconButton aria-label="" onClick={() => { setOpenEmoji(!openEmoji) }}>
                            <CloseIcon />
                        </IconButton> */}

                        {/* {
                            openEmoji && <Picker data={Data} previewPostion="none" background="red"
                                onEmojiSelect={handleEmojiClick} />
                        } */}
                    </Box>
                    <Box>

                    </Box>


















                </Box>
            </Box>
        </Modal>
    )
}

export default CreateModal