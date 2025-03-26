import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/User";

// Helper function to load initial state from localStorage
const loadInitialState = () => {
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const user = JSON.parse(localStorage.getItem("user") || null);

  return {
    user,
    authToken,
    refreshToken,
    isAuthenticated: !!authToken,
    isLoading: false,
    error: null,
    role: user?.role || null,
    isInitialized: false,
  };
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      return {
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return { isAuthenticated: false, isInitialized: true };
      }

      // First try direct auth check
      try {
        const { isAuthenticated, user } = await authAPI.checkAuth();
        if (isAuthenticated) {
          return {
            user,
            isAuthenticated: true,
            isInitialized: true,
            authToken: token,
            refreshToken: localStorage.getItem("refreshToken"),
          };
        }
      } catch (error) {
        console.debug("Initial auth check failed:", error.message);
      }

      // Fallback to token refresh
      try {
        const { accessToken, refreshToken } = await authAPI.refreshToken();
        const { isAuthenticated, user } = await authAPI.checkAuth();

        if (isAuthenticated) {
          return {
            user,
            isAuthenticated: true,
            isInitialized: true,
            authToken: accessToken,
            refreshToken,
          };
        }
      } catch (refreshError) {
        console.debug("Token refresh failed:", refreshError.message);
        await dispatch(logout());
        throw new Error("Session expired");
      }

      return { isAuthenticated: false, isInitialized: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      state.user = null;
      state.authToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.role = null;
      state.isInitialized = true;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.authToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.role = action.payload.user?.role;
      state.isInitialized = true;
    },
  },

  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.authToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.user.role;
        state.isInitialized = true;

        // Persist to localStorage
        localStorage.setItem("authToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Initialization cases
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user || state.user; // Preserve existing user if not provided
        state.authToken = action.payload.authToken || state.authToken;
        state.refreshToken = action.payload.refreshToken || state.refreshToken;
        state.role = action.payload.user?.role || state.role;
        state.isInitialized = true;

        // Update localStorage if new tokens were received
        if (action.payload.authToken) {
          localStorage.setItem("authToken", action.payload.authToken);
        }
        if (action.payload.refreshToken) {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isInitialized = true;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;
export const selectAuthLoading = (state) => state.auth.isLoading; 

export const { logout, loginSuccess, resetError } = authSlice.actions;
export default authSlice.reducer;
