import React from "react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "./contexts/ThemeContext"; 
import AuthInitializer from "./components/AuthInitializer";
import SessionTimer from './components/SessionTimer';


// Components
import FoodLandingPage from "./components/FoodLandingPage";
import AuthPage from "./pages/AuthPage";
import FoodApp from "./pages/FoodApp";
import VerifyEmail from "./components/VerifyEmail";
import MenuManagement from "./pages/MenuManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import NotFoundPage from "./pages/NotFoundPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider> 
            <CssBaseline />
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              autoHideDuration={3000}
            >
              <BrowserRouter>
                <ErrorBoundary>
                  <AuthInitializer>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<FoodLandingPage />} />
                      <Route path="/auth/*" element={<AuthPage />} />
                      <Route path="/email-verification" element={<VerifyEmail />} />

                      {/* Protected User Routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/user/dashboard" element={<FoodApp />} />
                        <Route
                          path="/user/*"
                          element={<Navigate to="/user/dashboard" replace />}
                        />
                      </Route>

                      {/* Admin Only Routes */}
                      <Route element={<AdminRoute />}>
                        <Route path="/admin/menu" element={<MenuManagement />} />
                        <Route
                          path="/admin/*"
                          element={<Navigate to="/admin/menu" replace />}
                        />
                      </Route>

                      {/* Error Pages */}
                      <Route path="/500" element={<ServerErrorPage />} />
                      <Route path="/404" element={<NotFoundPage />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                    <SessionTimer />
                  </AuthInitializer>
                </ErrorBoundary>
              </BrowserRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;