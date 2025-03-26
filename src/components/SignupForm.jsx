import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Lock,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmailModal from "./EmailModal";
import { authAPI } from "../api/User";

const SignUpForm = ({ isMobile, navigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Start loading
      const startTime = Date.now(); // Record the start time

      try {
        // Call the registerUser API
        const response = await authAPI.register(
          values.email,
          values.password,
          values.confirmPassword,
          "user"
        );

        // Calculate the remaining time to ensure the loader is shown for at least 2 seconds
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(2000 - elapsedTime, 0); // Ensure at least 2 seconds

        setTimeout(() => {
          // Show success notification with the API response message
          setSnackbar({
            open: true,
            message: response.message,
            severity: "success",
          });

          // Show the EmailModal on successful registration
          setShowEmailModal(true);
          setIsLoading(false); // Stop loading
        }, remainingTime);
      } catch (error) {
        // Calculate the remaining time to ensure the loader is shown for at least 2 seconds
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(2000 - elapsedTime, 0); // Ensure at least 2 seconds

        setTimeout(() => {
          // Show error notification with the API error message
          setSnackbar({
            open: true,
            message: error.response?.data?.message || "Registration failed",
            severity: "error",
          });
          setIsLoading(false); // Stop loading
        }, remainingTime);
      }
    },
  });

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Password visibility handlers
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // EmailModal close handler
  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: isMobile ? "8px" : "16px",
        boxShadow: 3,
        textAlign: "center",
        animation: "fadeIn 0.5s ease-in-out",
        width: isMobile ? "90%" : "100%",
        margin: "0 auto",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h1"
        sx={{ mb: 3, fontWeight: "bold", color: "#000000" }}
      >
        Join Us!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
        Create an account and explore delicious food.
      </Typography>

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-input": {
              color: "#000000", // Black text
            },
            "& .MuiInputLabel-root": {
              color: "#616161", // Dark gray label
              "&.Mui-focused": {
                color: "#000000", // Black when focused
              },
            },
          }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#000000" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-input": {
              color: "#000000", // Black text
            },
            "& .MuiInputLabel-root": {
              color: "#616161", // Dark gray label
              "&.Mui-focused": {
                color: "#000000", // Black when focused
              },
            },
          }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#000000" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#000000" }} />
                  ) : (
                    <Visibility sx={{ color: "#000000" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-input": {
              color: "#000000", // Black text
            },
            "& .MuiInputLabel-root": {
              color: "#616161", // Dark gray label
              "&.Mui-focused": {
                color: "#000000", // Black when focused
              },
            },
          }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#000000" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPassword} edge="end">
                  {showConfirmPassword ? (
                    <VisibilityOff sx={{ color: "#000000" }} />
                  ) : (
                    <Visibility sx={{ color: "#000000" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Sign Up Button */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{
            backgroundColor: "#000000",
            "&:hover": { backgroundColor: "#333333" },
            mb: 2,
            padding: isMobile ? "8px" : "12px",
            fontSize: isMobile ? "0.875rem" : "1rem",
            fontWeight: "bold",
            color: "#ffffff", // White text
            "&.Mui-disabled": {
              backgroundColor: "#e0e0e0", // Light gray when disabled
              color: "#9e9e9e", // Darker gray text
            },
          }}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} sx={{ color: "inherit" }} />
            ) : (
              <PersonAdd sx={{ color: "inherit" }} />
            )
          }
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </Button>

        {/* Login Link */}
        <Typography variant="body2" sx={{ color: "#555" }}>
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/auth/login")}
            sx={{
              color: "#ff5722",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#e64a19",
              },
            }}
          >
            Login
          </Button>
        </Typography>
      </form>

      {/* Email Modal */}
      {showEmailModal && <EmailModal onClose={handleCloseEmailModal} />}

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;
