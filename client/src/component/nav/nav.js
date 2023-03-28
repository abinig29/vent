import { BorderLeft } from "@mui/icons-material";
import { Box, Typography, ButtonGroup, Button, Card } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
        position: "sticky",
        top: "0px",
        zIndex: "5",
      }}
    >
      <ButtonGroup
        variant="contained"
        fullWidth
        disableElevation
        sx={{ borderTop: "1px solid white" }}
      >
        <Button
          onClick={() => {
            navigate("/home", { replace: true });
          }}
          sx={{
            background:
              location.pathname === "/home" ? "#cdbfb6" : "transparent",
            padding: "1rem",
            "&:hover": {
              background: "#cdbfb6",
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
          onClick={() => {
            navigate("/home/listning", { replace: true });
          }}
          sx={{
            background:
              location.pathname === "/home/listning"
                ? "#cdbfb6"
                : "transparent",
            padding: "1rem",
            "&:hover": {
              background: "#cdbfb6",
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
