import mongoose from "mongoose";
import Notification from "../models/Notification.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    return res.status(201).json({
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { userId, isRead, type } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "userId query is required",
      });
    }

    const filters = { userId };
    if (typeof isRead !== "undefined") {
      filters.isRead = isRead === "true";
    }
    if (type) {
      filters.type = type;
    }

    const notifications = await Notification.find(filters).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

export const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid notification id" });
    }

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification retrieved successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch notification",
      error: error.message,
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid notification id" });
    }

    const { isRead } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: typeof isRead === "boolean" ? isRead : true },
      { new: true, runValidators: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification updated successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid notification id" });
    }

    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification deleted successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};
