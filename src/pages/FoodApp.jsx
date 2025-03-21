import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';

const FoodApp = () => {
  return (
    <>
      <CssBaseline /> {/* Reset CSS */}
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Dashboard />
      </Container>
    </>
  );
};

export default FoodApp;