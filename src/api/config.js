
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://oppurtunity-radar.onrender.com";


export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;