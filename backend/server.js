import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hotelRoutes from './routes/hotelRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
// Routes
import userRoutes from "./routes/userRoutes.js";
import destinationRoutes from './routes/destinationRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

// Config
dotenv.config();
connectDB();

const app = express();


// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/v1/users", userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/packages', packageRoutes);
app.use('/api/recommendations', recommendationRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Smart Tourism API",
  });
});


// ================= SERVER =================
const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Mode: ${process.env.DEV_MODE}`);
});