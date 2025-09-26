import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUsers } from "../data/loginUsers";

const LoginScreen: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("User:", userName);
    console.log("Password:", password);
    const loginUser = loginUsers.find(
      (user) => user.username === userName && user.password === password
    );
    if (loginUser) {
      console.log("Login successful");
      navigate("/home", { state: { userName } });
    } else {
      console.log("Login failed");
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2} sx={{ width: "400px" }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Box>
        <Box mb={2} sx={{ width: "400px" }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ width: "400px" }}
        >
          Login
        </Button>
      </form>
      <Typography mt={2} variant="body1" color="error">
        {error}
      </Typography>
    </Box>
  );
};

export default LoginScreen;
