import express from "express";
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.route("/").post(createHotel).get(getHotels);
router.route("/:id").get(getHotelById).put(updateHotel).delete(deleteHotel);

export default router;
