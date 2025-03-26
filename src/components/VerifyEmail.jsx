import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/User"; 
import { Container, Typography, CircularProgress, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

// In your React component
useEffect(() => {
  const verify = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      let token = queryParams.get('token');
      
      if (!token) {
        // Fallback for encoded tokens
        const url = new URL(window.location.href);
        token = url.searchParams.get('token');
      }

      if (!token) throw new Error("No token found");

      const startTime = Date.now();
      const response = await authAPI.verifyEmail(token);
      console.log(`Verification took ${Date.now() - startTime}ms`);
      
      setMessage(response.message);
      setIsVerified(true);
    } catch (err) {
      setMessage(err.message.includes('aborted') 
        ? "Verification timed out" 
        : err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  verify();
}, []);

  const handleGoToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {isLoading ? (
        <CircularProgress size={60} sx={{ color: "primary.main" }} />
      ) : (
        <>
          {isVerified ? (
            <CheckCircleOutlineIcon
              sx={{ fontSize: 80, color: "success.main", mb: 2 }}
            />
          ) : (
            <ErrorOutlineIcon
              sx={{ fontSize: 80, color: "error.main", mb: 2 }}
            />
          )}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {isVerified ? "Email Verified!" : "Verification Failed"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {message}
          </Typography>
          {isVerified && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoToLogin}
              sx={{
                borderRadius: "20px",
                padding: "10px 30px",
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              Go to Login
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default VerifyEmail;
