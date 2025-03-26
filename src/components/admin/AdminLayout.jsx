// components/admin/AdminLayout.jsx
import { Box } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import PropTypes from "prop-types";

const AdminLayout = ({ children, title, onToggleTheme }) => {
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh",
      bgcolor: "background.default"
    }}>
      <AdminNavbar title={title} onToggleTheme={onToggleTheme} />
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        {children}
      </Box>
      <AdminFooter />
    </Box>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onToggleTheme: PropTypes.func.isRequired
};

export default AdminLayout;