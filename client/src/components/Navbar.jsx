import React from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color={"primary"} fontWeight="bold">
        AI GPT3 Clone
      </Typography>
      {loggedIn ? (
        <Button variant="outlined" color="primary" onClick={handleLogout} sx={{ ml: 2 }}>
          Logout
        </Button>
      ) : (
        <>
          <NavLink to="/register" style={{ marginRight: 16, textDecoration: 'none' }}>
            <Button variant="outlined" color="primary">Sign Up</Button>
          </NavLink>
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Sign In</Button>
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
