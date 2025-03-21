import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import pancake from "../assets/pancakeslicedstrawberry.jpg";
import rice from "../assets/rice.jpg";
import iceCream from "../assets/IceCream.jpg";
import pasta from "../assets/pasta2.jpg";
import milkshake from "../assets/milkshake.jpg";
import spag from "../assets/spag.jpg";
import pastaMain from "../assets/pasta.jpg";
import creamySalad from "../assets/saladcreamy.jpg";
import burger from "../assets/burger.jpg";
import {
  LocalDining,
  DeliveryDining,
  SupportAgent,
} from "@mui/icons-material";
import Footer from "./Footer"; // Import the Footer component

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FoodLandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Sample food data with imported images
  const foods = [
    {
      id: 1,
      name: "Pancake",
      image: pancake,
      description: "Fluffy pancakes with maple syrup and fresh berries.",
    },
    {
      id: 2,
      name: "Rice Bowl",
      image: rice,
      description: "Healthy rice bowl with veggies and your choice of protein.",
    },
    {
      id: 3,
      name: "Ice Cream",
      image: iceCream,
      description: "Creamy ice cream with a variety of toppings.",
    },
    {
      id: 4,
      name: "Pasta",
      image: pasta,
      description: "Creamy pasta with garlic bread.",
    },
    {
      id: 5,
      name: "Milkshake",
      image: milkshake,
      description: "Thick and creamy milkshakes in various flavors.",
    },
    {
      id: 6,
      name: "Spaghetti",
      image: spag,
      description: "Classic spaghetti with rich tomato sauce.",
    },
    {
      id: 7,
      name: "Creamy Salad",
      image: creamySalad,
      description: "Creamy Salad plate with rich crunchy biscuits.",
    },
    {
      id: 8,
      name: "Harmburger",
      image: burger,
      description: "Rich healthy burger with fresh lettuce and some tomatoe.",
    },
  ];

  // Handle order button click
  const handleOrderClick = () => {
    navigate("auth/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: isMobile ? "60vh" : isTablet ? "70vh" : "80vh",
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={pastaMain}
          alt="Pasta Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              fontSize: isMobile ? "2rem" : isTablet ? "3rem" : "4rem",
            }}
          >
            Welcome to Our Food Store
          </Typography>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h2"
            sx={{
              mb: 3,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              fontSize: isMobile ? "1rem" : isTablet ? "1.25rem" : "1.5rem",
            }}
          >
            Order your favorite food and drinks and enjoy your delicious meal!
          </Typography>
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            sx={{
              backgroundColor: "#ff5722",
              "&:hover": { backgroundColor: "#e64a19" },
              fontSize: isMobile ? "1rem" : "1.25rem",
              padding: isMobile ? "8px 16px" : "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              marginTop: "20px",
              width: "200px",
            }}
            onClick={handleOrderClick}
          >
            Order Now
          </Button>
        </Box>
      </Box>

      {/* Why Choose Us Section */}
      <Box
        sx={{
          py: isMobile ? 4 : 8,
          backgroundColor: "#f5f5f5",
          animation: `${fadeIn} 1s ease-in-out`,
        }}
      >
        <Container>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <LocalDining
                  sx={{ fontSize: "3rem", color: "#ff5722", mb: 2 }}
                />{" "}
                {/* Icon */}
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  component="h3"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Fresh Ingredients
                </Typography>
                <Typography variant="body1">
                  We use only the freshest ingredients to ensure the best taste
                  and quality.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <DeliveryDining
                  sx={{ fontSize: "3rem", color: "#ff5722", mb: 2 }}
                />{" "}
                {/* Icon */}
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  component="h3"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Fast Delivery
                </Typography>
                <Typography variant="body1">
                  Get your food delivered quickly and hot, right to your
                  doorstep.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <SupportAgent
                  sx={{ fontSize: "3rem", color: "#ff5722", mb: 2 }}
                />{" "}
                {/* Icon */}
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  component="h3"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  24/7 Support
                </Typography>
                <Typography variant="body1">
                  Our customer support team is always available to assist you.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Food Gallery */}
      <Box sx={{ py: isMobile ? 4 : 8, animation: `${fadeIn} 1s ease-in-out` }}>
        <Container>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
          >
            Our Menu
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {foods.map((food) => (
              <Grid item key={food.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    borderRadius: "10px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                      transform: "scale(1.02)",
                      transition: "transform 0.3s",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "150" : "200"}
                    image={food.image}
                    alt={food.name}
                    sx={{ width: "100%", objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {" "}
                    {/* Ensure consistent card heights */}
                    <Typography
                      gutterBottom
                      variant={isMobile ? "h6" : "h5"}
                      component="div"
                    >
                      {food.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {food.description}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", pb: 2 }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#ff5722",
                        "&:hover": { backgroundColor: "#e64a19" },
                      }}
                      onClick={handleOrderClick}
                    >
                      Order Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Customer Reviews Section */}
      <Box
        sx={{
          py: isMobile ? 4 : 8,
          backgroundColor: "#f5f5f5",
          animation: `${fadeIn} 1s ease-in-out`,
        }}
      >
        <Container>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
          >
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                "The food is always fresh and delicious. Highly recommended!"
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                - John Doe
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                "Fast delivery and great customer service. Will order again!"
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                - Jane Smith
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                "Amazing variety of dishes. Love the sushi!"
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                - Mike Johnson
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default FoodLandingPage;