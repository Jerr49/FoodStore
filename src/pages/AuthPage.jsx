import React from 'react';
import { Box, Container, Slide, useTheme, useMediaQuery } from '@mui/material'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import foodBackground from '../assets/fruitsplater.jpg';
const AuthPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const location = useLocation(); 
  const navigate = useNavigate();

  const isLogin = location.pathname === '/auth/login'; 
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${foodBackground})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth={isMobile ? 'xs' : 'sm'}> 
        {/* Slide in Login Form */}
        <Slide direction="right" in={isLogin} mountOnEnter unmountOnExit>
          <div>
            <LoginForm isMobile={isMobile} navigate={navigate} />
          </div>
        </Slide>

        {/* Slide in Sign-Up Form */}
        <Slide direction="left" in={!isLogin} mountOnEnter unmountOnExit>
          <div>
            <SignUpForm isMobile={isMobile} navigate={navigate} />
          </div>
        </Slide>
      </Container>
    </Box>
  );
};

export default AuthPage;