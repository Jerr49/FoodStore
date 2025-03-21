// src/App.js
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodLandingPage from "./components/FoodLandingPage";
import AuthPage from "./pages/AuthPage";
import FoodApp from "./pages/FoodApp";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FoodLandingPage />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/dashboard" element={<FoodApp />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
