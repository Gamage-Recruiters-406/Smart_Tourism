import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  blockUser,
  deleteUser,
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();


// ================= AUTH =================
router.post("/register", registerUser);
router.post("/login", loginUser);


// ================= USER =================
router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);


// ================= ADMIN =================
router.get("/", protect, adminOnly, getAllUsers);

router.put("/admin/block/:id", protect, adminOnly, blockUser);

router.delete("/admin/delete/:id", protect, adminOnly, deleteUser);


export default router;