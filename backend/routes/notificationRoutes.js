import express from "express";
import {
  createNotification,
  getNotifications,
  getNotificationById,
  markNotificationRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.route("/").post(createNotification).get(getNotifications);
router.put("/:id/read", markNotificationRead);
router.route("/:id").get(getNotificationById).delete(deleteNotification);

export default router;
