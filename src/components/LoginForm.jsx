import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { authAPI } from "../api/User";
import { loginSuccess } from "../features/auth/authSlice";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = ({ isMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await authAPI.login(values.email, values.password);

        localStorage.setItem("authToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));

        dispatch(
          loginSuccess({
            user: response.user,
            role: response.user.role,
          })
        );

        setNotification({
          open: true,
          message: "Login successful! Redirecting...",
          severity: "success",
        });

        const redirectPath =
          response.user.role === "admin" ? "/admin/menu" : "/user/dashboard";
        navigate(redirectPath);
      } catch (err) {
        console.error("Login error:", err);
        setNotification({
          open: true,
          message: err.message || "Login failed. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
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
        sx={{ mb: 3, fontWeight: "bold", color: "#ff5722" }}
      >
        Welcome Back!
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#424242",
              },
              "&:hover fieldset": {
                borderColor: "#212121",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff5722",
              },
              "& .MuiInputBase-input": {
                color: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#424242",
              "&.Mui-focused": {
                color: "#ff5722",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#ff5722" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#424242",
              },
              "&:hover fieldset": {
                borderColor: "#212121",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff5722",
              },
              "& .MuiInputBase-input": {
                color: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#424242",
              "&.Mui-focused": {
                color: "#ff5722",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#ff5722" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#424242" }} />
                  ) : (
                    <Visibility sx={{ color: "#424242" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading || !formik.isValid}
          sx={{
            backgroundColor: "#ff5722",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#e64a19" },
            mb: 2,
            padding: isMobile ? "8px" : "12px",
            fontSize: isMobile ? "0.875rem" : "1rem",
            fontWeight: "bold",
            "&.Mui-disabled": {
              backgroundColor: "#ffccbc",
              color: "#5d4037",
            },
          }}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Person />
            )
          }
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Typography variant="body2" sx={{ color: "#424242" }}>
        Don't have an account?{" "}
        <Button
          onClick={() => navigate("/auth/signup")}
          sx={{
            color: "#ff5722",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              color: "#e64a19",
              backgroundColor: "transparent",
            },
          }}
        >
          Create Account
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
