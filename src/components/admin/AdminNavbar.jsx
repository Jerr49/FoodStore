import React, { useState } from "react";
import PropTypes from "prop-types";
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Badge,
  Menu, 
  MenuItem, 
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  Menu as MenuIcon,
  NotificationsOutlined,
  LogoutOutlined,
  SettingsOutlined,
  AccountCircleOutlined,
  Brightness4,
  Brightness7,
  Close
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ title, onToggleTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar 
      position="fixed" // Changed to fixed to ensure proper positioning
      elevation={0} 
      sx={{ 
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: (theme) => theme.zIndex.drawer + 1 // Ensure navbar stays above other content
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={onToggleTheme} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          
          {!isDesktop ? (
            <>
              <IconButton
                size="large"
                edge="end"
                onClick={handleMenuOpen}
                color="inherit"
                sx={{
                  '& .MuiSvgIcon-root': {
                    '&:nth-of-type(2)': {
                      width: '80%'
                    }
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    width: '40%',
                    height: '32%',
                    ml: '20px',
                    maxWidth: 220,
                    borderRadius: '12px',
                    position: 'fixed',
                    right: 16,
                    top: 'auto',
                    bottom: 80, 
                    py: 0,
                    mt: 5,
                    '& .MuiList-root': {
                      py: 0
                    }
                  }
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                  <AccountCircleOutlined sx={{ mr: 1.5, fontSize: '1.1rem' }} />
                  <Typography variant="body2">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                  <SettingsOutlined sx={{ mr: 1.5, fontSize: '1.1rem' }} />
                  <Typography variant="body2">Settings</Typography>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                  <LogoutOutlined sx={{ mr: 1.5, fontSize: '1.1rem' }} />
                  <Typography variant="body2">Logout</Typography>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem 
                  onClick={handleMenuClose} 
                  sx={{ 
                    py: 1,
                    justifyContent: 'center',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  <Close sx={{ fontSize: '1.2rem', color: theme.palette.text.secondary }} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                edge="end"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircleOutlined />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    minWidth: 180,
                    borderRadius: '8px',
                    mt: 1,
                    '& .MuiList-root': {
                      py: 0
                    }
                  }
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <AccountCircleOutlined sx={{ mr: 1.5 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <SettingsOutlined sx={{ mr: 1.5 }} />
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutOutlined sx={{ mr: 1.5 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

AdminNavbar.propTypes = {
  title: PropTypes.string,
  onToggleTheme: PropTypes.func.isRequired
};

AdminNavbar.defaultProps = {
  title: "Admin Dashboard"
};

export default AdminNavbar;