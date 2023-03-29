import { BorderLeft } from "@mui/icons-material";
import { Box, Typography, ButtonGroup, Button, Card } from "@mui/material";
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card
      bgcolor={"white"}
      color={"black"}
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(5px)",
        borderLeft: "1px solid white",
        maxWidth: "100%",
        borderRadius: "0px",
        position: "sticky",
        top: "0px",
        zIndex: "5",
      }}
    >
      <ButtonGroup variant="contained" fullWidth disableElevation>
        <Button
          component={Link}
          to="/home"
          sx={{
            background:
              location.pathname === "/home" ? "#e8e7e7" : "transparent",
            padding: "1rem",
            "&:hover": {
              background: "#e8e7e7",
            },
          }}
          disableElevation
          disableTouchRipple
        >
          <Typography
            variant="body1"
            textTransform={"uppercase"}
            color={"black"}
          >
            For you
          </Typography>
        </Button>
        <Button
          component={Link}
          to="/home/listning"
          sx={{
            background:
              location.pathname === "/home/listning"
                ? "#e8e7e7"
                : "transparent",
            padding: "1rem",
            "&:hover": {
              background: "#e8e7e7",
            },
          }}
          disableElevation
          disableTouchRipple
        >
          <Typography variant="body1" color={"black"}>
            Listnening
          </Typography>
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default Nav;
