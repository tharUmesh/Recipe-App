// Determine if we're in production or development
const isProduction = window.location.hostname !== "localhost";

// Use appropriate API URL based on environment
const API_URL = isProduction
  ? `http://${window.location.hostname}:5000/api`
  : "http://localhost:5000/api";

export default API_URL;
