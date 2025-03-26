import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: 'light'
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark"); 

  const value = useMemo(() => ({
    toggleTheme: () => setMode(prev => prev === "light" ? "dark" : "light"),
    mode
  }), [mode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
        contrastText: mode === "light" ? "#ffffff" : "#121212",
      },
      secondary: {
        main: mode === "light" ? "#9c27b0" : "#f48fb1",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      error: {
        main: "#f44336",
      },
      success: {
        main: "#4caf50",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: mode === 'light' ? '#424242' : '#757575',
              },
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#212121' : '#9e9e9e',
              },
              '&.Mui-focused fieldset': {
                borderColor: mode === 'light' ? '#1976d2' : '#90caf9',
              },
            },
            '& .MuiInputLabel-root': {
              color: mode === 'light' ? '#424242' : '#b0b0b0',
              '&.Mui-focused': {
                color: mode === 'light' ? '#1976d2' : '#90caf9',
              },
            },
          },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};