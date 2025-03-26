// pages/admin/MenuManagement.jsx
import React, { useState, useContext } from "react";
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  RestaurantMenuOutlined,
  CategoryOutlined,
  AddCircleOutlineOutlined,
  ReceiptOutlined
} from "@mui/icons-material";
import AdminLayout from "../components/admin/AdminLayout";
import CreateCategory from "../components/admin/CreateCategory";
import AddMenuItem from "../components/admin/AddMenuItem";
import MenuList from "../components/admin/MenuList";
import OrdersTable from "../components/admin/OrdersTable";
import { ThemeContext } from "../contexts/ThemeContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MenuManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, ] = useState(false);
  const { toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AdminLayout 
      title="Menu Management" 
      onToggleTheme={toggleTheme}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 }, pt: 2 }}>
        <Typography 
          variant={isSmallScreen ? "h5" : "h4"} 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            mt: { xs: 3, sm: 4 },
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          Menu Management
        </Typography>

        <Box sx={{ 
          borderBottom: 1, 
          borderColor: "divider",
          mb: { xs: 2, sm: 3 }
        }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="menu management tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: isSmallScreen ? 48 : 56,
                padding: isSmallScreen ? '6px 8px' : '12px 16px',
                fontSize: isSmallScreen ? '0.7rem' : '0.875rem'
              }
            }}
          >
            <Tab 
              icon={<RestaurantMenuOutlined fontSize={isSmallScreen ? "small" : "medium"} />} 
              iconPosition="start" 
              label={isSmallScreen ? "Menu" : "View Menu"} 
              disabled={loading}
            />
            <Tab 
              icon={<CategoryOutlined fontSize={isSmallScreen ? "small" : "medium"} />} 
              iconPosition="start" 
              label={isSmallScreen ? "Category" : "Add Category"} 
              disabled={loading}
            />
            <Tab 
              icon={<AddCircleOutlineOutlined fontSize={isSmallScreen ? "small" : "medium"} />} 
              iconPosition="start" 
              label={isSmallScreen ? "Add Item" : "Add Menu Item"} 
              disabled={loading}
            />
            <Tab 
              icon={<ReceiptOutlined fontSize={isSmallScreen ? "small" : "medium"} />} 
              iconPosition="start" 
              label={isSmallScreen ? "Orders" : "View Orders"} 
              disabled={loading}
            />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress size={isSmallScreen ? 24 : 40} />
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <MenuList />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <CreateCategory />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <AddMenuItem />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <OrdersTable />
            </TabPanel>
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default MenuManagement;