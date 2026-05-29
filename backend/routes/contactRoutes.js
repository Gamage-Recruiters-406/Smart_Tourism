import express from "express";
import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactStatus,
  deleteContactMessage,
} from "../controllers/contactController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", createContactMessage);

// Admin
router.get("/", protect, adminOnly, getContactMessages);
router.get("/:id", protect, adminOnly, getContactMessageById);
router.put("/:id/status", protect, adminOnly, updateContactStatus);
router.delete("/:id", protect, adminOnly, deleteContactMessage);

export default router;
