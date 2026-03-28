// src/api/config.js

// This checks if you have a VITE_API_URL in your .env or Netlify settings.
// If not, it falls back to your Render URL.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://oppurtunity-radar.onrender.com";

// Helper to make sure paths are joined correctly
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;