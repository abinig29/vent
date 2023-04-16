import React, { useState } from 'react'
import {
    Modal, Box, Typography, Divider, IconButton, Avatar, TextField, Button, Stack, Grid, Alert, AlertTitle
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
import { useDispatch, useSelector } from 'react-redux';
import { createVent } from '../../api';
import { createSingleVent } from '../../feature/ventSlice';
import { openMoodModal, closeMoodModal } from '../../feature/modalSlice';



const CreateModal = ({ open, handleClose }) => {
    const { user } = useSelector(state => state.user)
    const { ismoodSelecting } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const [mood, setMood] = useState("")
    const [picture, setPicture] = useState("")

    const [error, setError] = useState({ errText: '', errState: false, errType: "" })


    const closemodal = () => {
        handleClose()
        setText("")
        setMood("")
        setPicture("")
    }
    const handlePost = async () => {
        if (text) {
            try {
                const formData = new FormData()
                formData.append("userId", user._id)
                formData.append("userName", user.userName)
                formData.append("userPicturePath", user.coverPhoto)
                formData.append("ventMood", mood)
                formData.append("ventText", text)
                formData.append("ventPhoto", picture.name)
                formData.append("picture", picture)
                dispatch(createSingleVent({ formData, handleClose, setError }))
                setError({ errState: true, errType: "success", errText: "vent creating..." })
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
            onClose={closemodal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>{!ismoodSelecting ?
                (<Box position={"relative"} p={4} >
                    <IconButton aria-label="" onClick={() => { closemodal() }} sx={{
                        position: "absolute", top: "5px", right: "20px", bgcolor: "rgba(233,233,233,0.8)"
                    }}>
                        <Close />
                    </IconButton>
                    <Typography variant="h6" color="text.secondary" align='center' fontWeight={700}>Create Vent</Typography>
                    <Divider />
                    <CustomBox sx={{ mt: 2, justifyContent: "space-between" }}>
                        <CustomBox>
                            <Avatar src="https://tse1.mm.bing.net/th/id/OIP.mHW53jey0964kxQqcgCj9gHaLH?pid=ImgDet&w=199&h=298&c=7&dpr=1.3" alt='Abel' />
                            <Typography variant="h6" color="black" ml={2}>Abel Nigus{mood && `  is ${mood}`}</Typography>
                        </CustomBox>
                        <Button onClick={() => dispatch(openMoodModal())} variant='contained' sx={{ bgcolor: "#da254b", "&:hover": { bgcolor: "#e35b77" } }} disableElevation >
                            <Typography variant="body1" color="white">Mood</Typography>
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
                                        sx={{ "&:hover": { cursor: "pointer" }, display: "flex", alignItems: "center" }}
                                        height={"100%"}
                                    >
                                        <input {...getInputProps()} />
                                        {!picture ? (
                                            <Typography sx={{ pl: 2 }}>chooser your  photo</Typography>
                                        ) : (
                                            <Box flex={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, height: "100%" }}>
                                                <Typography>{picture.name}</Typography>

                                                <EditOutlined />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                        <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#da254b", "&:hover": { bgcolor: "#e35b77" } }} onClick={handlePost}>
                            send post
                        </Button>
                        {
                            error.errState && <Alert severity={error.errType} sx={{ mt: 2, width: "100%" }}>
                                <Typography variant="body2" color="" align='center'>{error.errText}</Typography>
                            </Alert>
                        }


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
                        <IconButton aria-label="" onClick={() => { dispatch(closeMoodModal()) }}>
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
                                        dispatch(closeMoodModal())
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
                </Box>)
            }
            </Box >
        </Modal >
    )
}

export default CreateModal