import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Button,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We are a food delivery service dedicated to bringing you the best
              meals from around the world. Fresh ingredients, fast delivery, and
              excellent customer service are our priorities.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Links
            </Typography>
            <List>
              <ListItem disablePadding>
                <Link href="/" color="inherit" underline="none">
                  <ListItemText primary="Home" />
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/menu" color="inherit" underline="none">
                  <ListItemText primary="Menu" />
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/about" color="inherit" underline="none">
                  <ListItemText primary="About Us" />
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/contact" color="inherit" underline="none">
                  <ListItemText primary="Contact Us" />
                </Link>
              </ListItem>
            </List>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Contact Us
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: "36px", color: "white" }}>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="info@foodstore.com" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: "36px", color: "white" }}>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary="+1 (123) 456-7890" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: "36px", color: "white" }}>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary="123 Food Street, City, Country" />
              </ListItem>
            </List>
          </Grid>

          {/* Address Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Visit Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              123 Food Street
              <br />
              City, State 12345
              <br />
              Country
            </Typography>
            <Link
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="none"
            >
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": { borderColor: "#ff5722", color: "#ff5722" },
                }}
              >
                View on Map
              </Button>
            </Link>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                sx={{ color: "white" }}
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography variant="body2" sx={{ mt: 4 }}>
          &copy; 2023 Food Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;