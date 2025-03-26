import axios from "axios";

// Base API setup
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Flag and queue for token refresh
let isRefreshing = false;
let failedRequestsQueue = [];

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 errors)
    if (error.response?.status === 401) {
      // Specific case for expired tokens
      if (error.response.data?.code === "TOKEN_EXPIRED") {
        await authAPI.forceLogout();
        window.location.href = "/login?session=expired";
        return Promise.reject(error);
      }

      // Skip refresh attempt for logout/refresh endpoints
      if (
        originalRequest.url.includes("logout") ||
        originalRequest.url.includes("refresh-token")
      ) {
        return Promise.reject(error);
      }

      // Token refresh logic
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { accessToken, expiresAt } = await authAPI.refreshToken();

          // Update stored tokens
          localStorage.setItem("authToken", accessToken);

          // Update current request header
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Process queued requests
          failedRequestsQueue.forEach((cb) => cb(accessToken));
          failedRequestsQueue = [];

          // Schedule automatic logout
          if (expiresAt) {
            const expiresIn = new Date(expiresAt).getTime() - Date.now();
            if (expiresIn > 0) {
              setTimeout(() => {
                authAPI.forceLogout();
                window.location.href = "/auth/login?session=expired";
              }, expiresIn);
            }
          }

          return api(originalRequest);
        } catch (refreshError) {
          // Clear everything if refresh fails
          await authAPI.forceLogout();
          window.location.href = "/login?session=expired";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue requests during refresh
      return new Promise((resolve) => {
        failedRequestsQueue.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Registration
  register: async (email, password, confirmPassword, role) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await api.post("/register", {
        email,
        password,
        confirmPassword,
        role,
      });

      return response.data;
    } catch (err) {
      console.error("Registration error:", err);
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  },

  checkAuth: async () => {
    try {
      const response = await api.get("/check-auth");
      return {
        isAuthenticated: true,
        user: response.data.user,
      };
    } catch (error) {
      if (error.response?.status === 401) {
        return { isAuthenticated: false };
      }
      console.error("Auth check error:", error);
      throw error;
    }
  },

  verifyEmail: async (token) => {
    try {
      const response = await api.post("/verify-email", {
        token: encodeURIComponent(token),
      });
      return response.data;
    } catch (err) {
      console.error("Verification error:", err);
      throw new Error(err.response?.data?.message || "Verification failed");
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });

      if (response.data.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem(
          "currentSessionId",
          response.data.user.currentSessionId
        );

        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
        };
      }
      throw new Error("Authentication failed");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post("/logout");
      localStorage.clear();
      return response.data;
    } catch (error) {
      await authAPI.forceLogout();
      throw error;
    }
  },

  // Force logout (clear storage and redirect)
  forceLogout: async () => {
    localStorage.clear();
    window.location.href = "/login";
  },

  // Logout All Devices
  logoutAll: async () => {
    try {
      await api.post("/logout-all");
      localStorage.clear();
    } catch (error) {
      console.error("Logout all error:", error);
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },

  // Session Management
  sessions: {
    list: async () => {
      try {
        const response = await api.get("/sessions");
        return response.data;
      } catch (error) {
        console.error("Get sessions error:", error);
        throw new Error(
          error.response?.data?.message || "Failed to get sessions"
        );
      }
    },

    terminate: async (sessionId) => {
      try {
        await api.post(`/sessions/${sessionId}/terminate`);
      } catch (error) {
        console.error("Terminate session error:", error);
        throw new Error(
          error.response?.data?.message || "Failed to terminate session"
        );
      }
    },
  },

  // Token Refresh
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/refresh-token", { refreshToken });

      if (response.data.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken);

        // Store new refresh token if rotation is enabled
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        return response.data.accessToken;
      }
      throw new Error("Token refresh failed");
    } catch (error) {
      console.error("Refresh token error:", error);
      await authAPI.forceLogout();
      throw error;
    }
  },

  // Validate token (optional)
  validateToken: async () => {
    try {
      const response = await api.get("/validate-token");
      return response.data;
    } catch (error) {
      console.error("Token validation error:", error);
      throw error;
    }
  },
};

// Initialize auth state on app load
export const initializeAuth = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    // Optionally validate token on startup
    await authAPI.validateToken();
    return { token };
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // If token is invalid, try to refresh
    try {
      const newToken = await authAPI.refreshToken();
      return { token: newToken };
      // eslint-disable-next-line no-unused-vars
    } catch (refreshError) {
      await authAPI.forceLogout();
      return null;
    }
  }
};
