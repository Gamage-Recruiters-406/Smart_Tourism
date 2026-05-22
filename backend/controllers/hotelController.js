import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
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

    const hotels = await Hotel.find(filters).sort({ createdAt: -1 });
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

    const hotel = await Hotel.findById(id);
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

    const hotel = await Hotel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

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

    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

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
