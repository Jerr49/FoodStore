import React, { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
  Pagination,
  Skeleton,
  Button
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { menuAPI } from '../../api/Menu';

const MenuItem = ({ item, onEdit, onRemove }) => (
  <Card sx={{ 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 3
    }
  }}>
    <CardMedia
      component="img"
      height="200"
      image={item.image || 'https://via.placeholder.com/300x200?text=No+Image'}
      alt={item.name}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h3">
        {item.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {item.description}
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mt: 'auto' // Pushes this container to the bottom
      }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(item.price)}
        </Typography>
        <Box>
          <IconButton 
            aria-label="edit" 
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(25, 118, 210, 0.08)' 
              },
              ml: 1
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            aria-label="delete" 
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item._id);
            }}
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(211, 47, 47, 0.08)' 
              },
              ml: 1
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const MenuList = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menuAPI.getMenu();
        setMenu(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load menu. Please try again.');
        console.error('Menu fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [retryCount]);

  const handleEditItem = (item) => {
    console.log('Edit item:', item);
    // TODO: Implement edit functionality
    // This will open a modal or form with the item data
  };

  const handleRemoveItem = (itemId) => {
    console.log('Remove item with ID:', itemId);
    // TODO: Implement remove functionality
    // This will call your API endpoint to delete the item
    // Then refresh the menu data
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (_, newValue) => {
    setActiveCategory(newValue);
    setPage(1);
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error"
        action={
          <Button 
            color="inherit" 
            size="small"
            onClick={() => {
              setRetryCount(prev => prev + 1);
              setError('');
              setLoading(true);
            }}
          >
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (!menu || Object.keys(menu).length === 0) {
    return <Alert severity="info">No menu items available</Alert>;
  }

  const filteredMenu = Object.entries(menu).reduce((acc, [category, data]) => {
    const filteredItems = data.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[category] = { ...data, items: filteredItems };
    }
    return acc;
  }, {});

  const allItems = activeCategory === 'all' 
    ? Object.values(filteredMenu).flatMap(category => category.items)
    : filteredMenu[activeCategory]?.items || [];

  const paginatedItems = allItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const displayedItems = activeCategory === 'all'
    ? paginatedItems.reduce((acc, item) => {
        const category = Object.keys(menu).find(cat => 
          menu[cat].items.some(i => i._id === item._id)
        );
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {})
    : { [activeCategory]: paginatedItems };

  return (
    <Box sx={{ mt: 4 }}>
      <TextField
        fullWidth
        label="Search menu items"
        variant="outlined"
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: searchTerm && (
            <IconButton onClick={() => {
              setSearchTerm('');
              setPage(1);
            }}>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />

      <Tabs 
        value={activeCategory}
        onChange={handleCategoryChange}
        sx={{ mb: 3 }}
      >
        <Tab label="All" value="all" />
        {Object.keys(menu).map(category => (
          <Tab 
            key={category}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            value={category}
          />
        ))}
      </Tabs>

      {Object.keys(displayedItems).length === 0 ? (
        <Alert severity="info">No items found matching your search</Alert>
      ) : (
        <>
          {Object.entries(displayedItems).map(([categoryName, items]) => (
            <Box key={categoryName} sx={{ mb: 4 }}>
              {activeCategory === 'all' && (
                <Typography variant="h4" component="h2" gutterBottom>
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </Typography>
              )}
              
              <Grid container spacing={3}>
                {items.map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MenuItem 
                        item={item} 
                        onEdit={handleEditItem}
                        onRemove={handleRemoveItem}
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          {allItems.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(allItems.length / itemsPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
              sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default MenuList;