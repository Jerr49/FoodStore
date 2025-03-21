import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Email } from '@mui/icons-material'; 

const EmailModal = ({ onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        backdropFilter: 'blur(8px)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: isMobile ? 2 : 4, 
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)', 
          maxWidth: isMobile ? '300px' : '400px', 
          width: '90%',
          animation: 'slideIn 0.3s ease-out', 
        }}
      >
        <Email
          sx={{
            fontSize: isMobile ? 48 : 60,
            color: '#DB4437', 
            mb: 2,
          }}
        />
        <Typography
          variant={isMobile ? 'h6' : 'h5'} 
          sx={{ mb: 2, fontWeight: 'bold', color: '#000000' }}
        >
          Check Your Email
        </Typography>
        <Typography
          variant={isMobile ? 'body2' : 'body1'} 
          sx={{ mb: 3, color: '#555' }}
        >
          We've sent a verification link to your email address. Please check your inbox and click the link to confirm your account.
        </Typography>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: '#000000',
            '&:hover': { backgroundColor: '#333333' },
            borderRadius: '12px', 
            padding: isMobile ? '8px 16px' : '10px 20px', 
            fontSize: isMobile ? '0.875rem' : '1rem', 
            fontWeight: 'bold',
            textTransform: 'none', 
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default EmailModal;