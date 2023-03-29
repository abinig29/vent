import React, { useState } from 'react'
import {
    Modal, Box, Typography, Divider, IconButton, Avatar, TextField, Button, InputBase, Stack, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Height } from '@mui/icons-material';
import Picker from "@emoji-mart/react"
import Data from "@emoji-mart/data"
import styled from '@emotion/styled';
import { emotions } from '../../data';
import Dropzone from "react-dropzone";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EditOutlined, ArrowBack, Close } from '@mui/icons-material/';
import { useSelector } from 'react-redux';
import { createVent } from '../../api';


const CreateModal = ({ open, handleClose }) => {
    const { user } = useSelector(state => state.user)
    const [text, setText] = useState("")
    const [mood, setMood] = useState("")
    const [picture, setPicture] = useState("")
    const [ismoodSelecting, setIsmoodSelecting] = useState(false)
    // const [openEmoji, setOpenEmoji] = useState(false)

    const handleEmojiClick = (e) => {
        setText(pre => pre + e.native)
        // setOpenEmoji(false)
    }
    // _id: id[0],
    //     userId: "6415a045d7154777b2bc3121",
    //         userPicturePath:
    // "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0",
    //     userName: "abel",
    //         ventMood: "tired",
    //             ventText:
    // "I need to vent Friends with benefits is good right like its ohkay i want that like no sex buh making out and acting like nothing happened thats what we guys want please girls be like this too like mutual sexual support",
    //     tags: ["afraied"],
    //         comment: [],
    const handlePost = async () => {
        if (text && mood) {
            try {
                const formData = new FormData()
                formData.append("userId", user._id)
                formData.append("userName", user.userName)
                formData.append("userPicturePath", "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0")
                formData.append("ventMood", mood)
                formData.append("ventText", text)
                formData.append("ventPhoto", picture.name)
                formData.append("picture", picture)
                const { data: { data } } = await createVent(formData)
                console.log(data)
                setMood("")
                setText("")
                setPicture("")
            } catch (error) {

            }
        }

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: (!ismoodSelecting) ? 500 : 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: "20px",


    };
    const CustomBox = styled(Box)({
        display: 'flex', alignItems: "center",
    })
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>{!ismoodSelecting ?
                (<Box position={"relative"} p={4} >
                    <IconButton aria-label="" onClick={() => { handleClose() }} sx={{
                        position: "absolute", top: "5px", right: "20px", bgcolor: "rgba(233,233,233,0.8)"
                    }}>
                        <Close />
                    </IconButton>
                    <Typography variant="h6" color="initial" align='center' fontWeight={700}>Create Vent</Typography>
                    <Divider />
                    <CustomBox sx={{ mt: 2, justifyContent: "space-between" }}>
                        <CustomBox>
                            <Avatar src="https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3" alt='Abel' />
                            <Typography variant="h6" color="black" ml={2}>Abel Nigus{mood && `  is ${mood}`}</Typography>
                        </CustomBox>
                        <Button onClick={() => { setIsmoodSelecting(true) }}>
                            <Typography variant="body1" color="primary">Mood</Typography>
                        </Button>
                    </CustomBox>
                    <Box sx={{ display: 'flex', mt: 2, alignItems: "center", flexDirection: "column", }} >
                        <TextField
                            border="none"
                            id="tetx"

                            placeholder='what is in your mind'
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}
                            fullWidth
                            multiline
                            sx={{ fontSize: "20px", lineHeight: "15px" }}
                            rows={5}
                        />
                        <Box
                            border={`1px solid black`}
                            borderRadius="5px"

                            width={"100%"}
                            height={"50px"}
                            mt={2}

                        >

                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setPicture(acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        // border={`2px dashed ${palette.primary.main}`}
                                        sx={{ "&:hover": { cursor: "pointer" } }}

                                        height={"100%"}
                                    >
                                        <input {...getInputProps()} />
                                        {!picture ? (
                                            <p>chooser your  photo</p>
                                        ) : (
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography>{picture.name}</Typography>

                                                <EditOutlined />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handlePost}>
                            send post
                        </Button>


                        {/* <IconButton aria-label="" onClick={() => { setOpenEmoji(!openEmoji) }}>
                            <CloseIcon />
                        </IconButton> */}

                        {/* {
                            openEmoji && <Picker data={Data} previewPostion="none" background="red"
                                onEmojiSelect={handleEmojiClick} />
                                
                        } */}
                    </Box>
                </Box>) : (<Box flexDirection={"row"} height={"100%"}  >
                    <Box sx={{ p: 2, display: "flex", alignItems: "center", }}>
                        <IconButton aria-label="" onClick={() => { setIsmoodSelecting(false) }}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="body1" color="text.secondary" align="center" mx={2}>Select Your Mood</Typography>
                    </Box>
                    <Grid container spacing={2}
                        sx={{
                            px: 2,
                            overflowY: "scroll",
                            height: "88%",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>
                        {emotions.map((emotion) => {
                            return (
                                <Grid item lg={6}>
                                    <Button variant="contained" disableElevation fullWidth sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        p: 2,
                                        bgcolor: "transparent",
                                        borderRadius: "50px",
                                        "&:hover": {
                                            background: "rgba(233,233,233,0.6)",
                                        },
                                    }} onClick={() => {
                                        setMood(emotion.text)
                                        setIsmoodSelecting(false)
                                    }}>
                                        <Avatar >
                                            {emotion.emoji}
                                        </Avatar>
                                        <Typography mx={2} variant="v5" color="initial">{emotion.text}</Typography>
                                    </Button>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>)}
            </Box>
        </Modal >
    )
}

export default CreateModal