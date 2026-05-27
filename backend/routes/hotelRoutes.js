import express from "express";
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createHotel).get(getHotels);
router
  .route("/:id")
  .get(getHotelById)
  .put(protect, updateHotel)
  .delete(protect, deleteHotel);

export default router;
