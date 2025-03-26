import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Alert,
  TextField,
  IconButton,
  Button,
  Badge,
  CircularProgress,
  Snackbar,
  Chip,
  Stack,
  Tabs,
  Tab,
  Pagination,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Search,
  Clear,
  AddShoppingCart,
  ShoppingCart,
  Refresh,
} from "@mui/icons-material";
import { menuAPI } from "../api/Menu";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State management
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = isMobile ? 4 : 8;
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await menuAPI.getMenu();
        setMenuData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load menu. Please try again."
        );
        console.error("Menu fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Filter menu based on search term
  const filteredMenu = menuData
    ? Object.entries(menuData).reduce((acc, [category, data]) => {
        const filteredItems = data.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredItems.length > 0) {
          acc[category] = { ...data, items: filteredItems };
        }
        return acc;
      }, {})
    : {};

  // Flatten all items when "All" category is selected for proper pagination
  const allItems =
    activeCategory === "all"
      ? Object.values(filteredMenu).flatMap((category) => category.items)
      : filteredMenu[activeCategory]?.items || [];

  // Get paginated items
  const paginatedItems = allItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Group paginated items by category for display when "All" is selected
  const displayedItems =
    activeCategory === "all"
      ? paginatedItems.reduce((acc, item) => {
          const category = Object.keys(menuData || {}).find((cat) =>
            menuData[cat].items.some((i) => i._id === item._id)
          );
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {})
      : { [activeCategory]: paginatedItems };

  // Add item to cart
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setSnackbar({
      open: true,
      message: `${item.name} added to cart`,
      severity: "success",
    });
  };

  // Retry loading menu
  const retryLoad = async () => {
    setError("");
    setLoading(true);
    setMenuData(null);
    try {
      const response = await menuAPI.getMenu();
      setMenuData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load menu. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // Handle category change
  const handleCategoryChange = (_, newValue) => {
    setActiveCategory(newValue);
    setPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={retryLoad}
              startIcon={<Refresh />}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  // Empty state
  if (!menuData || Object.keys(menuData).length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">No menu items available</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        p: isMobile ? 1 : 3,
      }}
    >
      {/* Mobile App Bar with Cart Button */}
      {isMobile && (
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            mb: 2,
            background: "none",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: 0,
              minHeight: "48px !important",
            }}
          >
            <Badge badgeContent={cart.length} color="primary" sx={{ mr: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ShoppingCart />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  minWidth: "auto",
                }}
              >
                Cart
              </Button>
            </Badge>
          </Toolbar>
        </AppBar>
      )}

      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          Our Menu
        </Typography>
      </Box>

      {/* Search and Desktop Cart */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            maxWidth: isMobile ? "100%" : 500,
            backgroundColor: "background.paper",
          }}
          size={isMobile ? "small" : "medium"}
          InputProps={{
            startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
            endAdornment: searchTerm && (
              <IconButton
                onClick={() => {
                  setSearchTerm("");
                  setPage(1);
                }}
                size="small"
              >
                <Clear />
              </IconButton>
            ),
          }}
        />

        {!isMobile && (
          <Badge badgeContent={cart.length} color="primary" overlap="circular">
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              sx={{
                whiteSpace: "nowrap",
                py: isMobile ? 1 : 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: "bold",
              }}
              size={isMobile ? "small" : "medium"}
            >
              View Cart
            </Button>
          </Badge>
        )}
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={activeCategory}
        onChange={handleCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="All" value="all" />
        {Object.keys(menuData).map((category) => (
          <Tab
            key={category}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            value={category}
          />
        ))}
      </Tabs>

      {/* Menu Items */}
      {Object.keys(displayedItems).length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "40vh",
            textAlign: "center",
            p: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: 1,
          }}
        >
          <Search sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No items found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {searchTerm
              ? `No matches for "${searchTerm}"`
              : "No items in this category"}
          </Typography>
          {searchTerm && (
            <Button
              variant="outlined"
              onClick={() => setSearchTerm("")}
              startIcon={<Clear />}
              size={isMobile ? "small" : "medium"}
            >
              Clear search
            </Button>
          )}
        </Box>
      ) : (
        <>
          {Object.entries(displayedItems).map(([categoryName, items]) => (
            <Box key={categoryName} sx={{ mb: 5 }}>
              {activeCategory === "all" && (
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                  }}
                >
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                  <Chip
                    label={`${items.length} items`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Typography>
              )}

              <Grid container spacing={isMobile ? 1 : 3}>
                {items.map((item) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={item._id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        borderRadius: 2,
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={isMobile ? 120 : 180}
                        image={
                          item.image ||
                          "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={item.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: isMobile ? 1 : 2 }}>
                        <Stack direction="column" spacing={0.5}>
                          <Typography
                            gutterBottom
                            variant={isMobile ? "subtitle1" : "h6"}
                            component="h3"
                            sx={{
                              fontWeight: "bold",
                              fontSize: isMobile ? "0.9rem" : "1rem",
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 1,
                              fontSize: isMobile ? "0.8rem" : "0.9rem",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Stack>
                      </CardContent>
                      <Box
                        sx={{
                          p: isMobile ? 1 : 2,
                          pt: 0,
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                        >
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            sx={{
                              fontWeight: "bold",
                              fontSize: isMobile ? "0.9rem" : "1rem",
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                          <Button
                            variant="contained"
                            size={isMobile ? "small" : "medium"}
                            startIcon={<AddShoppingCart />}
                            onClick={() => addToCart(item)}
                            sx={{
                              borderRadius: 1,
                              textTransform: "none",
                              fontWeight: "bold",
                              p: isMobile ? "4px 8px" : "6px 12px",
                            }}
                          >
                            {isMobile ? "" : "Add"}
                          </Button>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          {/* Pagination */}
          {allItems.length > itemsPerPage && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
                mb: 2,
              }}
            >
              <Pagination
                count={Math.ceil(allItems.length / itemsPerPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size={isMobile ? "small" : "large"}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: isMobile ? "0.75rem" : "1rem",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Snackbar notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          elevation={6}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
