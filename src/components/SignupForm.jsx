import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Email, Lock, PersonAdd, Visibility, VisibilityOff } from '@mui/icons-material';
import EmailModal from './EmailModal'; // Import the EmailModal component

const SignUpForm = ({ isMobile, navigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); // State to control modal visibility

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSignUp = () => {
    // Simulate a sign-up process (e.g., API call)
    // After successful sign-up, show the email modal
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false); // Close the modal
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
        sx={{ mb: 3, fontWeight: 'bold', color: '#000000' }}
      >
        Join Us!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
        Create an account and explore delicious food.
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
                <Email sx={{ color: '#000000' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          sx={{ mb: 2 }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: '#000000' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          sx={{ mb: 2 }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: '#000000' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSignUp} // Trigger the sign-up process
          sx={{
            backgroundColor: '#000000',
            '&:hover': { backgroundColor: '#333333' },
            mb: 2,
            padding: isMobile ? '8px' : '12px',
            fontSize: isMobile ? '0.875rem' : '1rem',
            fontWeight: 'bold',
          }}
          startIcon={<PersonAdd />}
        >
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ color: '#555' }}>
          Already have an account?{' '}
          <Button
            onClick={() => navigate('/auth/login')}
            sx={{ color: '#ff5722', textTransform: 'none' }}
          >
            Login
          </Button>
        </Typography>
      </form>

      {/* Render the EmailModal if showEmailModal is true */}
      {showEmailModal && <EmailModal onClose={handleCloseEmailModal} />}
    </Box>
  );
};

export default SignUpForm;