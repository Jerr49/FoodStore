import React, { useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CategorySection from './CategorySection';
import { africanMeals, americanMeals, chineseMeals } from './Data';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

  // State to track which category is expanded
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Function to handle "See More" click
  const handleSeeMore = (category) => {
    setExpandedCategory(category); // Expand the selected category
  };

  // Function to handle "See Less" click
  const handleSeeLess = () => {
    setExpandedCategory(null); // Collapse the expanded category
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        backgroundColor: '#fafafa', 
        minHeight: '100vh',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)', 
          borderRadius: '16px',
          p: 4,
          textAlign: 'center',
          mb: 6,
          color: '#ffffff',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontFamily: 'Poppins, sans-serif', 
          }}
        >
          Explore Delicious Meals
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif', 
          }}
        >
          Discover meals from around the world and add them to your cart.
        </Typography>
      </Box>

      {/* Category Sections */}
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <CategorySection
          title="African Meals"
          meals={africanMeals}
          isExpanded={expandedCategory === 'african'} 
          onSeeMore={() => handleSeeMore('african')} 
          onSeeLess={handleSeeLess} 
        />
        <CategorySection
          title="American Meals"
          meals={americanMeals}
          isExpanded={expandedCategory === 'american'}
          onSeeMore={() => handleSeeMore('american')}
          onSeeLess={handleSeeLess}
        />
        <CategorySection
          title="Chinese Meals"
          meals={chineseMeals}
          isExpanded={expandedCategory === 'chinese'}
          onSeeMore={() => handleSeeMore('chinese')}
          onSeeLess={handleSeeLess}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;