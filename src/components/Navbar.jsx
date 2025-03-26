import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, IconButton, Drawer, 
  List, ListItem, ListItemText, ListItemIcon, 
  useMediaQuery, useTheme, Box, Button,
  Menu, MenuItem, Avatar, Divider, Snackbar, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home, Restaurant, AccountCircle, 
  ExitToApp, ShoppingBag, Person,
  Close, Devices, Computer, PhoneAndroid
} from '@mui/icons-material';
import { authAPI } from '../api/User'; 

// Custom Hamburger Icon
const HamburgerIcon = styled('div')(({ theme, open }) => ({
  width: '24px',
  height: '18px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  
  '& span': {
    display: 'block',
    height: '2px',
    backgroundColor: theme.palette.common.white,
    borderRadius: '1px',
    transition: 'all 0.3s ease',
  },
  
  '& span:nth-of-type(1)': {
    width: '100%',
    transform: open ? 'rotate(45deg) translate(5px, 6px)' : 'none',
  },
  
  '& span:nth-of-type(2)': {
    width: '80%',
    marginLeft: 'auto', 
    opacity: open ? 0 : 1,
  },
  
  '& span:nth-of-type(3)': {
    width: '100%',
    transform: open ? 'rotate(-45deg) translate(5px, -6px)' : 'none',
  }
}));

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [sessionsAnchor, setSessionsAnchor] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handlers
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const openProfileMenu = (e) => setProfileAnchor(e.currentTarget);
  const closeProfileMenu = () => setProfileAnchor(null);
  const openSessionsMenu = (e) => {
    fetchSessions();
    setSessionsAnchor(e.currentTarget);
  };
  const closeSessionsMenu = () => setSessionsAnchor(null);

  const fetchSessions = async () => {
    try {
      const sessions = await authAPI.sessions.list();
      setSessions(sessions);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Logout Handlers
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/auth/login');
      showSnackbar('Logged out successfully');
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      closeProfileMenu();
    }
  };

  const handleLogoutAll = async () => {
    try {
      await authAPI.logoutAll();
      navigate('/login');
      showSnackbar('Logged out from all devices');
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      closeProfileMenu();
    }
  };

  const handleTerminateSession = async (sessionId) => {
    try {
      await authAPI.sessions.terminate(sessionId);
      fetchSessions();
      showSnackbar('Session terminated');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  // Menu Items
  const navItems = [
    { text: 'Home', link: '/', icon: <Home /> },
    { text: 'African Meals', link: '#african', icon: <Restaurant /> },
    { text: 'American Meals', link: '#american', icon: <Restaurant /> },
    { text: 'Chinese Meals', link: '#chinese', icon: <Restaurant /> },
  ];

  const profileItems = [
    { text: 'Profile', link: '/profile', icon: <Person /> },
    { text: 'Orders', link: '/orders', icon: <ShoppingBag /> },
    { 
      text: 'Active Sessions', 
      action: openSessionsMenu, 
      icon: <Devices /> 
    },
    { 
      text: 'Logout All Devices', 
      action: handleLogoutAll, 
      icon: <ExitToApp /> 
    },
    { 
      text: 'Logout', 
      action: handleLogout, 
      icon: <ExitToApp /> 
    },
  ];

  // Get device icon based on type
  const getDeviceIcon = (device) => {
    if (device.includes('desktop')) return <Computer />;
    if (device.includes('mobile')) return <PhoneAndroid />;
    return <Devices />;
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ color: 'white' }}>
            Food Dashboard
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              edge="end"
              sx={{ ml: 2 }}
            >
              <HamburgerIcon open={drawerOpen}>
                <span />
                <span />
                <span />
              </HamburgerIcon>
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  href={item.link}
                  startIcon={item.icon}
                  sx={{ mx: 1, color: 'white' }}
                >
                  {item.text}
                </Button>
              ))}
              
              <IconButton onClick={openProfileMenu} sx={{ ml: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer with white text */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'black',
          },
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component="a" 
              href={item.link}
              onClick={toggleDrawer}
              sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          ))}
          
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          
          {profileItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={item.link ? 'a' : 'div'}
              href={item.link}
              onClick={item.action || toggleDrawer}
              sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          ))}
        </List>

        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={toggleDrawer}
          startIcon={<Close />}
          sx={{
            mt: 'auto',
            py: 2,
            borderRadius: 0,
            fontWeight: 'bold'
          }}
        >
          Close Menu
        </Button>
      </Drawer>

      {/* Profile Menu (Desktop) with white text */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={closeProfileMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            bgcolor: 'black',
            color: 'white',
            '& .MuiListItemIcon-root': {
              color: 'white'
            }
          }
        }}
      >
        <MenuItem onClick={closeProfileMenu} disabled sx={{ color: 'white' }}>
          <ListItemIcon><AccountCircle fontSize="small" sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        {profileItems.map((item) => (
          <MenuItem
            key={item.text}
            onClick={item.action || closeProfileMenu}
            component={item.link ? 'a' : 'div'}
            href={item.link}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {/* Sessions Menu with white text */}
      <Menu
        anchorEl={sessionsAnchor}
        open={Boolean(sessionsAnchor)}
        onClose={closeSessionsMenu}
        PaperProps={{
          style: {
            maxHeight: '400px',
            width: '350px',
            backgroundColor: 'black',
            color: 'white'
          },
        }}
      >
        <MenuItem disabled sx={{ color: 'white' }}>
          <ListItemText 
            primary="Active Sessions" 
            secondary={`${sessions.length} devices`} 
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
          />
        </MenuItem>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        
        {sessions.map((session) => (
          <MenuItem 
            key={session.id} 
            sx={{ 
              py: 1,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{getDeviceIcon(session.device)}</ListItemIcon>
            <ListItemText
              primary={session.device}
              secondary={`${session.location} • Last active: ${new Date(session.lastActive).toLocaleString()}`}
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            {!session.current && (
              <IconButton 
                edge="end" 
                color="error"
                onClick={() => handleTerminateSession(session.id)}
              >
                <ExitToApp fontSize="small" />
              </IconButton>
            )}
          </MenuItem>
        ))}
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;