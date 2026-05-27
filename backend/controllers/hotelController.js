import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createHotel = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { userId, ...payload } = req.body;
    const hotel = await Hotel.create({
      ...payload,
      userId: req.user._id,
    });
    return res.status(201).json({
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create hotel",
      error: error.message,
    });
  }
};

export const getHotels = async (req, res) => {
  try {
    const filters = {};
    if (req.query.destinationId) {
      filters.destinationId = req.query.destinationId;
    }
    if (req.query.userId) {
      filters.userId = req.query.userId;
    }

    const hotels = await Hotel.find(filters)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Hotels retrieved successfully",
      data: hotels,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid hotel id" });
    }

    const hotel = await Hotel.findById(id).populate("userId", "name email");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    return res.status(200).json({
      message: "Hotel retrieved successfully",
      data: hotel,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch hotel",
      error: error.message,
    });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid hotel id" });
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (
      hotel.userId &&
      hotel.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { userId, ...updateData } = req.body;
    Object.assign(hotel, updateData);
    await hotel.save();

    return res.status(200).json({
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update hotel",
      error: error.message,
    });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid hotel id" });
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (
      hotel.userId &&
      hotel.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await hotel.deleteOne();

    return res.status(200).json({
      message: "Hotel deleted successfully",
      data: hotel,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete hotel",
      error: error.message,
    });
  }
};
