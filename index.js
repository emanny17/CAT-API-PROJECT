import express from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const CAT_API_URL = process.env.CAT_API_URL || "https://catfact.ninja/fact";
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT) || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

const axiosInstance = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    Accept: "application/json",
  },
});

// GET /me endpoint
app.get(
  "/me",
  asyncHandler(async (req, res) => {
    let catFact;
    let apiSuccess = true;

    // Attempt to fetch cat fact with error handling
    const factResponse = await axiosInstance.get(CAT_API_URL).catch((error) => {
      apiSuccess = false;
      console.error(
        `[${new Date().toISOString()}] Cat Facts API Error:`,
        error.message
      );

      // Return fallback fact if API fails
      if (error.code === "ECONNABORTED") {
        console.warn("Cat Facts API timeout - using fallback");
      } else if (error.response) {
        console.warn(`Cat Facts API returned status ${error.response.status}`);
      } else if (error.request) {
        console.warn("No response received from Cat Facts API");
      }

      return null;
    });

    // Use fetched fact or fallback message
    if (
      apiSuccess &&
      factResponse &&
      factResponse.data &&
      factResponse.data.fact
    ) {
      catFact = factResponse.data.fact;
      console.log(
        `[${new Date().toISOString()}] Successfully fetched cat fact`
      );
    } else {
      catFact =
        "Cats are fascinating creatures! (Cat Facts API temporarily unavailable)";
      console.warn(`[${new Date().toISOString()}] Using fallback cat fact`);
    }

    const responseData = {
      status: "success",
      user: {
        email: process.env.USER_EMAIL,
        name: process.env.USER_NAME,
        stack: process.env.USER_STACK,
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(responseData);
  })
);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(
    `[${new Date().toISOString()}] Server is running on port ${PORT}`
  );
});

export default app;
