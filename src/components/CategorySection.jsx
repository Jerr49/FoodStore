import React from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import MealCard from './MealCard';

const CategorySection = ({ title, meals, isExpanded, onSeeMore, onSeeLess }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            color: '#000', // Deep green text
            fontFamily: 'Poppins, sans-serif', // Modern font
          }}
        >
          {title}
        </Typography>
      </motion.div>
      <Grid container spacing={4}>
        {meals
          .slice(0, isExpanded ? meals.length : 3) // Show all meals if expanded, else show 3
          .map((meal, index) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <MealCard meal={meal} />
              </motion.div>
            </Grid>
          ))}
      </Grid>
      {/* Show "See More" or "See Less" button based on expanded state */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {isExpanded ? (
          <Button
            variant="contained"
            onClick={onSeeLess}
            sx={{
              backgroundColor: '#000000', // Black background
              '&:hover': { backgroundColor: '#333333' }, // Darker black on hover
              borderRadius: '12px',
              padding: '10px 16px',
              fontWeight: 'bold',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              color: '#ffffff', // White text for contrast
              width: '200px', // Increased width
            }}
          >
            See Less
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onSeeMore}
            sx={{
              backgroundColor: '#000000', // Black background
              '&:hover': { backgroundColor: '#333333' }, // Darker black on hover
              borderRadius: '12px',
              padding: '10px 16px',
              fontWeight: 'bold',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              color: '#ffffff', // White text for contrast
              width: '200px', // Increased width
            }}
          >
            See More
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CategorySection;