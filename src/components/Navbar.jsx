import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, useMediaQuery, useTheme, Box, Button } from '@mui/material'; // Added Box and Button
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if the screen is mobile or tablet
  const [drawerOpen, setDrawerOpen] = React.useState(false); // State to control the drawer

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { text: 'Home', link: '/', icon: <HomeIcon /> },
    { text: 'African Meals', link: '#african', icon: <RestaurantIcon /> },
    { text: 'American Meals', link: '#american', icon: <RestaurantIcon /> },
    { text: 'Chinese Meals', link: '#chinese', icon: <RestaurantIcon /> },
    { text: 'Profile', link: '/profile', icon: <AccountCircleIcon /> },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Food Dashboard
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  href={item.link}
                  sx={{ mx: 1 }}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ width: 250 }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component="a" href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;