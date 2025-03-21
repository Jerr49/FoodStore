import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons

const LoginForm = ({ isMobile, navigate }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: isMobile ? '8px' : '16px',
        boxShadow: 3,
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-in-out',
        width: isMobile ? '90%' : '100%',
        margin: '0 auto',
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h1"
        sx={{ mb: 3, fontWeight: 'bold', color: '#ff5722' }}
      >
        Welcome Back!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
        Login to your account and enjoy delicious food.
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Email"
          type="email"
          sx={{ mb: 2 }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: '#ff5722' }} /> {/* Email icon */}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'} // Toggle password visibility
          sx={{ mb: 2 }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: '#ff5722' }} /> {/* Password icon */}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle eye icon */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#ff5722',
            '&:hover': { backgroundColor: '#e64a19' },
            mb: 2,
            padding: isMobile ? '8px' : '12px',
            fontSize: isMobile ? '0.875rem' : '1rem',
            fontWeight: 'bold',
          }}
          startIcon={<Person />} 
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ color: '#555' }}>
          Don't have an account?{' '}
          <Button
            onClick={() => navigate('/auth/signup')} 
            sx={{ color: '#000000', textTransform: 'none' }}
          >
            Create Account
          </Button>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginForm;