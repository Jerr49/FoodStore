import React from 'react';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const MealCard = ({ meal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        sx={{
          backgroundColor: '#ffffff', 
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out', 
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={meal.image}
          alt={meal.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 'bold', mb: 1, color: '#333333', fontFamily: 'Poppins, sans-serif' }}
          >
            {meal.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666666', mb: 2, fontFamily: 'Poppins, sans-serif' }}
          >
            {meal.description}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', color: '#6a11cb', fontFamily: 'Poppins, sans-serif' }}
          >
            ${meal.price}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#ff5722', 
              '&:hover': { backgroundColor: '#e64a19' }, 
              borderRadius: '12px',
              padding: '10px 16px',
              fontWeight: 'bold',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default MealCard;