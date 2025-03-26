import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default LoadingSpinner;