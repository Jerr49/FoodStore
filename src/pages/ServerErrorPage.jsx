// src/pages/ServerErrorPage.jsx
import React from 'react';
import { 
  Box,
  Container,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

const ServerErrorPage = () => {
  const theme = useTheme();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: theme.shadows[3]
        }}
      >
        <ErrorOutlineIcon 
          sx={{ 
            fontSize: 80, 
            color: 'error.main',
            mb: 2
          }} 
        />
        
        <Typography variant="h3" component="h1" gutterBottom>
          500 - Server Error
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Oops! Something went wrong on our end. Our team has been notified and we're working to fix it.
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Please try again later or contact support if the problem persists.
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshOutlinedIcon />}
            onClick={handleRefresh}
            sx={{ px: 4 }}
          >
            Refresh Page
          </Button>
          
          <Button
            variant="outlined"
            component={RouterLink}
            to="/"
            startIcon={<HomeOutlinedIcon />}
            sx={{ px: 4 }}
          >
            Return Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServerErrorPage;