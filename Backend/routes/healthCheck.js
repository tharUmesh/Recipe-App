const express = require("express");
const router = express.Router();

// Simple health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date(),
    service: "recipe-app-backend",
    version: process.env.npm_package_version || "1.0.0",
  });
});

// Status endpoint with more detailed information
router.get("/status", (req, res) => {
  res.status(200).json({
    status: "operational",
    timestamp: new Date(),
    uptime: process.uptime(),
    database: "connected",
    environment: process.env.NODE_ENV || "development",
  });
});

module.exports = router;
