// components/admin/AdminFooter.jsx
import { Box, Typography, Container } from "@mui/material";
import PropTypes from "prop-types";

const AdminFooter = ({ companyName }) => {
  return (
    <Box component="footer" sx={{ 
      py: 3, 
      px: 2, 
      mt: "auto", 
      bgcolor: "background.paper",
      borderTop: "1px solid",
      borderColor: "divider"
    }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

AdminFooter.propTypes = {
  companyName: PropTypes.string
};

AdminFooter.defaultProps = {
  companyName: "FoodStore Admin"
};

export default AdminFooter;