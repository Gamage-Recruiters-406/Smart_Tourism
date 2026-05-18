import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


// Configure environment
dotenv.config();

// Database config
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json())
app.use(cookieParser());


// Routes


// Default Route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Smart Tourism",
  });
});


// Server Listener
const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode`.bgCyan.white);
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});