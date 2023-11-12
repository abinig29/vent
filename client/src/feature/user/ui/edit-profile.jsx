import React, { useEffect } from 'react'
import { Modal, Box, Stack, Typography, IconButton, Divider, TextField, InputBase, Button } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../userSlice';
import * as yup from "yup"
import { Formik } from 'formik';
import Dropzone from 'react-dropzone';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: "auto",
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: "20px",
    px: 3


};
const editProfileSchema = yup.object().shape({
    userName: yup.string(),
    bio: yup.string(),
    picture: yup.string()
});
const CustomBox = styled(Box)({
    display: 'flex', alignItems: "center",
})
const EditProfile = ({ open, handleClose }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const intialState = { userName: user?.userName, picture: "", bio: user?.bio }
    const handleSave = (values, onSubmitProps) => {
        const formData = new FormData();
        // for (let value in values) {
        //     formData.append(value, values[value])
        // }

        formData.append("userName", values.userName)
        formData.append("picture", values.picture)
        formData.append("bio", values.bio)
        if (values.picture)
            formData.append("coverPhoto", values.picture.name);
        dispatch(editUser({ body: formData, userId: user?._id }))

        setTimeout(() => {
            handleClose()
        }, 1000)

    }

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
                    }} sx={{
                        bgcolor: "rgba(233,233,233,0.8)"
                    }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack spacing={3} p={5}>
                    <Formik
                        onSubmit={handleSave}
                        initialValues={intialState}
                        validationSchema={editProfileSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (

                            <form onSubmit={handleSubmit}>
                                <Box
                                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                >

                                    <>

                                        <TextField
                                            label="user name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.userName}
                                            fullWidth
                                            name="userName"
                                            error={Boolean(touched.userName) && Boolean(errors.userName)}
                                            helperText={touched.userName && errors.userName}

                                        />
                                        <TextField
                                            label="bio"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            multiline
                                            maxRows={4}
                                            value={values.bio}
                                            name="bio"
                                            error={Boolean(touched.bio) && Boolean(errors.bio)}
                                            helperText={touched.bio && errors.bio}

                                        />
                                        <Box
                                            border={`1px solid black`}
                                            borderRadius="5px"
                                        >
                                            <Dropzone
                                                acceptedFiles=".jpg,.jpeg,.png"
                                                multiple={false}
                                                onDrop={(acceptedFiles) =>
                                                    setFieldValue("picture", acceptedFiles[0])
                                                }
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <Box
                                                        {...getRootProps()}
                                                        // border={`2px dashed ${palette.primary.main}`}
                                                        p="1rem"
                                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                                    >
                                                        <input {...getInputProps()} />
                                                        {!values.picture ? (
                                                            <p>chooser your profile photo</p>
                                                        ) : (
                                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                <Typography>{values.picture.name}</Typography>
                                                                {/* <img src={URL.createObjectURL(values.picture.path)} alt="" /> */}

                                                            </Box>
                                                        )}
                                                    </Box>
                                                )}
                                            </Dropzone>
                                        </Box>
                                    </>
                                </Box>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant='contained'
                                    sx={{
                                        bgcolor: "#da254b",
                                        m: "2rem 0",
                                        p: "1rem",
                                        "&:hover": { background: "#ec8fa2" }
                                    }}
                                >
                                    Save
                                </Button>

                            </form>
                        )}
                    </Formik>

                </Stack>
            </Box>

        </Modal>
    )
}

export default EditProfile
