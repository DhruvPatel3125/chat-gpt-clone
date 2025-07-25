import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'; 
import axios from 'axios'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  //media
  const isNotMobile = useMediaQuery("(min-width:1000px)");

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/v1/auth/login', { email, password });
    toast.success('Login Successful');
    // Store token in localStorage or context
    localStorage.setItem('token', data.token);
    navigate('/');
  } catch (error) {
    console.log(error);
    if (error.response?.data?.error) {
      setError(error.response.data.error);
    } else if (error.message) {
      setError(error.message);
    } else {
      setError("Something went wrong");
    }

    setTimeout(() => {
      setError("");
    }, 5000);
  }
};

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{mb:2}}>{error}</Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Sign In</Typography>
        <TextField
          label="email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button type="submit" fullWidth variant="contained" size="large" sx={{color:'white',mt:2}}>Sign In</Button>
        <Typography mt={2}>Don't have an account ? <Link to="/register">Please Register</Link></Typography>
      </form>
    </Box>
  );
};

export default Login;
