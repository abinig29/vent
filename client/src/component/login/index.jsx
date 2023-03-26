import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./form.jsx"


const LoginPage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>

            <Typography fontWeight="bold" fontSize="32px" color="primary" align="center">
                Vent
            </Typography>


            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                m="2rem auto"
                borderRadius="1.5rem"

            >
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;